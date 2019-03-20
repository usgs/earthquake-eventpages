import { Injectable } from '@angular/core';
import { BehaviorSubject, of, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { FormatterService } from '@core/formatter.service';

export interface ArcGisAttributes {
  Addr_Type: string;
  Score: number;
}

export interface ArcGisExtent {
  xmax: number;
  xmin: number;
  ymax: number;
  ymin: number;
}

export interface ArcGisFeature {
  attributes: ArcGisAttributes;
  geometry: ArcGisGeometry;
}

export interface ArcGisGeometry {
  x: number;
  y: number;
}

export interface ArcGisLocation {
  extent: ArcGisExtent;
  feature: ArcGisFeature;
  name: string;
}

export interface ArcGisResponse {
  locations: Array<ArcGisLocation>;
  spatialReference: ArcGisSpatialReference;
}

export interface ArcGisSpatialReference {
  latestWkid: number;
  wkid: number;
}

/**
 * Standardized simplified interface used externally. Both the Geocode and
 * Geolocate results are mapped to this type.
 */
export interface Location {
  address: string;
  confidence: number;
  latitude: number;
  longitude: number;
}

export interface LocationError {
  code: number;
  message: string;
}

const GEOCODE_URL =
  'https://geocode.arcgis.com/arcgis/rest/services/' +
  'World/GeocodeServer/find';

@Injectable({
  providedIn: 'root'
})
export class GeoService {
  error$: Observable<LocationError>;
  geocodeUrl: string;
  geocoding$: Observable<boolean>;
  geolocating$: Observable<boolean>;
  location$: Observable<Location>;
  method$ = new BehaviorSubject<string>(null);

  private error = new BehaviorSubject<LocationError>(null);
  private flickerTimeout = 500; // milliseconds
  private geocoding = new BehaviorSubject<boolean>(false);
  private geolocating = new BehaviorSubject<boolean>(false);
  private location = new BehaviorSubject<Location>(null);

  constructor(
    public formatter: FormatterService,
    public httpClient: HttpClient
  ) {
    this.error$ = this.error.asObservable();
    this.geocoding$ = this.geocoding.asObservable();
    this.geolocating$ = this.geolocating.asObservable();
    this.location$ = this.location.asObservable();

    this.geocodeUrl = GEOCODE_URL;
  }

  geocode(input: string) {
    if (!input) {
      return;
    }

    const url = `${this.geocodeUrl}?f=json&text=${input}`;

    this.httpClient
      .get<ArcGisResponse>(url)
      .pipe(catchError(this.handleGeocodeError))
      .subscribe((response: ArcGisResponse) => {
        if (response.locations && response.locations.length !== 0) {
          this.onGeocodeSuccess(response.locations[0]);
        } else {
          this.onGeocodeError(response);
        }
      });

    this.method$.next('geocode');
    this.geocoding.next(true);
  }

  geolocate() {
    try {
      navigator.geolocation.getCurrentPosition(
        position => this.onGeolocateSuccess(position),
        error => this.onGeolocateError(error)
      );

      this.method$.next('geolocate');
      this.geolocating.next(true);
    } catch (e) {
      this.error.next({
        code: -1,
        message: 'Geolocation not supported'
      } as LocationError);
    }
  }

  private getGeocodeConfidence(score: number): number {
    if (score >= 90) {
      return 5;
    } else if (score >= 80) {
      return 4;
    } else if (score >= 70) {
      return 3;
    } else if (score >= 60) {
      return 2;
    } else if (score >= 50) {
      return 1;
    } else {
      return 0;
    }
  }

  private getGeolocationConfidence(accuracy: number): number {
    if (accuracy > 100000) {
      return 1;
    } else if (accuracy > 10000) {
      return 2;
    } else if (accuracy > 1000) {
      return 3;
    } else if (accuracy > 100) {
      return 4;
    } else {
      return 5;
    }
  }

  /**
   * Handle http error
   *
   * @param action
   * @param result
   */
  private handleGeocodeError(): Observable<ArcGisResponse> {
    const noLocation: ArcGisResponse = {
      locations: null,
      spatialReference: null
    } as ArcGisResponse;

    return of(noLocation);
  }

  private onGeocodeError(response: any): void {
    let message = 'Geocoding failed';

    if (response && response.locations && response.locations.length === 0) {
      message = 'No location found';
    }
    this.error.next({
      code: -1,
      message: message
    } as LocationError);

    setTimeout(_ => this.geocoding.next(false), this.flickerTimeout);
  }

  private onGeocodeSuccess(geocode: ArcGisLocation) {
    if (!this.geocoding.getValue()) {
      // Not currently geocoding, ignore spurious results
      return;
    }

    // Map ArcGisLocation to shared Location interface
    const address = geocode.name;
    const confidence = this.getGeocodeConfidence(
      geocode.feature.attributes.Score
    );
    const latitude = +this.formatter.number(
      geocode.feature.geometry.y,
      confidence
    );
    const longitude = +this.formatter.number(
      geocode.feature.geometry.x,
      confidence
    );

    this.location.next({
      address,
      confidence,
      latitude,
      longitude
    } as Location);

    setTimeout(_ => this.geocoding.next(false));
  }

  private onGeolocateError(positionError: PositionError): void {
    let message = 'An unknown error occurred during geolocation';
    if (positionError.code === 1) {
      message = 'Geolocation permission denied';
    } else if (positionError.code === 2) {
      message = 'Geolocation not currently available';
    } else if (positionError.code === 3) {
      // Note: Timeout can occur if permission not given/denied in time
      message = 'Geolocation taking too long to complete';
    }

    this.error.next({
      code: positionError.code,
      message: message
    } as LocationError);

    setTimeout(_ => this.geolocating.next(false), this.flickerTimeout);
  }

  private onGeolocateSuccess(position: Position) {
    if (!this.geolocating.getValue()) {
      // Not currently geolocating, ignore spurious results
      return;
    }

    // Map Position to shared Location interface
    const confidence = this.getGeolocationConfidence(+position.coords.accuracy);
    const latitude = +this.formatter.number(
      position.coords.latitude,
      confidence
    );
    const longitude = +this.formatter.number(
      position.coords.longitude,
      confidence
    );
    const address = this.formatter.location(latitude, longitude, confidence);

    this.location.next({
      address,
      confidence,
      latitude,
      longitude
    } as Location);

    // Artificial delay to avoid UI flicker effect when geolocation is fast
    setTimeout(_ => this.geolocating.next(false), this.flickerTimeout);
  }
}
