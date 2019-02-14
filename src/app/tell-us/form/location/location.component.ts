import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { AbstractForm } from '../abstract-form.component';
import { CoordinatesService } from 'hazdev-ng-location-view';
import { FormatterService } from '@core/formatter.service';
import { MatSnackBar } from '@angular/material';

import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

const GEOCODE_URL =
  'https://geocode.arcgis.com/arcgis/rest/services/' +
  'World/GeocodeServer/find';

@Component({
  selector: 'tell-us-form-location',
  styleUrls: ['./location.component.scss'],
  templateUrl: './location.component.html'
})
export class LocationComponent extends AbstractForm {
  geolocating = false;

  constructor(
    public coordinateService: CoordinatesService,
    public formatter: FormatterService,
    private http: HttpClient,
    private snackBar: MatSnackBar
  ) {
    super();
  }

  /**
   * Builds the request URL for the ArcGIS geocode
   *
   * @param location
   *    An address or geographic coordinate string
   */
  buildUrl(location: string): string {
    return GEOCODE_URL + '?' + `f=json` + `&text=${location}`;
  }

  /**
   * Geocode the input string using the ArcGIS geocode service
   *
   * @param location
   *     An address or geographic coordinate string
   */
  geocode(location: string) {
    if (!location) {
      return;
    }

    this.geolocating = false;
    const url = this.buildUrl(location);

    // make a geocode request
    this.http
      .get<any>(url)
      .pipe(catchError(this.handleError('getLocation', { locations: null })))
      .subscribe(response => {
        console.log('response', response);
        if (response.locations && response.locations.length !== 0) {
          this.onGeocodeSuccess(response.locations[0]);
        } else {
          this.onGeocodeError();
        }
      });
  }

  /**
   * Geolocate, get the users current location
   */
  geolocate() {
    try {
      this.geolocating = true;
      navigator.geolocation.getCurrentPosition(
        position => this.onGeolocateResult(position),
        error => this.onGeolocateError(error)
      );
    } catch (e) {
      console.log(`Failed geolocation: ${e}`);
    }
  }

  /**
   * Handle http error
   *
   * @param action
   * @param result
   */
  handleError<T>(action: string, result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }

  /**
   * Handles a geocode response with no results
   */
  onGeocodeError() {
    // Display error message. Use Snackbar.
    this.openSnackBar('No results. Please search again.', null, 3000);
  }

  /**
   * Handles a geocode response with at least one result
   *
   * @param response
   *      A geocode response from the ArcGIS geocode api
   *
   */
  onGeocodeSuccess(response: any) {
    // pull lat/lng/address from geocode response
    const latitude = response.feature.geometry.y;
    const longitude = response.feature.geometry.x;
    const address = response.name;

    // update location from FeltReport object
    this.feltReport.ciim_mapLat = latitude;
    this.feltReport.ciim_mapLon = longitude;
    this.feltReport.ciim_mapAddress = address;

    // TODO, create success message in snackbar??
  }

  onGeolocateError(error: PositionError) {
    this.geolocating = false;

    // TODO :: Let user know about error. Snackbar?
    // error.code === 0 --> unknown error
    // error.code === 1 --> permission denied
    // error.code === 2 --> unavailable
    // error.code === 3 --> timeout exceeded
    // Note: Timeout can occur if permission not given/denied in time
    //
    // error.message seems okay to show user
    console.log('A geolocating error occurred', error);
  }

  onGeolocateResult(position: Position) {
    if (!this.geolocating) {
      return;
    }

    const confidence = this.coordinateService.computeFromGeolocate(
      position.coords.accuracy
    );
    const latitude = this.coordinateService.roundLocation(
      +position.coords.latitude,
      confidence
    );
    const longitude = this.coordinateService.roundLocation(
      +position.coords.longitude,
      confidence
    );

    this.feltReport.location = {
      address: this.formatter.location(latitude, longitude, confidence),
      latitude,
      longitude
    };

    // Artificially force spinner to show for a minimum time. This may extend
    // the time slightly, but otherwise fast responses might give janky flicker
    // effect
    setTimeout(_ => (this.geolocating = false), 500);
  }

  /**
   * A generic method that displays a snackbar with the provided information
   *
   * @param message string
   *      the message to be displayed on snackbar
   * @param action string
   *      text to display as the action of the snackbar
   * @param length number
   *      amount of time to display the snackbar
   *
   */
  openSnackBar(message: string, action: string, length: number) {
    this.snackBar.open(message, action, {
      duration: length
    });
  }
}
