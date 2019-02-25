import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeolocateService {
  // Observable flag indicating if geolocating is being performed
  geolocating$: Observable<boolean>;
  // Observable location result from latest geolocation query
  geolocation$: Observable<Position>;
  // Observable PositionError resulting from latest geolocation query
  locationerr$: Observable<PositionError>;

  private flickerTimeout = 500; // milliseconds
  private geolocating = new BehaviorSubject<boolean>(false);
  private geolocation = new BehaviorSubject<Position>(null);
  private locationerr = new BehaviorSubject<PositionError>(null);

  constructor() {
    this.geolocating$ = this.geolocating.asObservable();
    this.geolocation$ = this.geolocation.asObservable();
    this.locationerr$ = this.locationerr.asObservable();
  }

  geolocate() {
    try {
      this.geolocating.next(true);

      navigator.geolocation.getCurrentPosition(
        position => this.onGeolocateResult(position),
        error => this.onGeolocateError(error)
      );
    } catch (e) {
      console.log(`Failed geolocation: ${e}`);
    }
  }

  onGeolocateError(error: PositionError) {
    this.locationerr.next(error);
    setTimeout(_ => this.geolocating.next(false), this.flickerTimeout);
  }

  onGeolocateResult(position: Position) {
    if (!this.geolocating.getValue()) {
      // Not currently geolocating, ignore spurious results
      return;
    }

    this.geolocation.next(position);

    // Artificial delay to avoid UI flicker effect when geolocation is fast
    setTimeout(_ => this.geolocating.next(false), this.flickerTimeout);
  }
}
