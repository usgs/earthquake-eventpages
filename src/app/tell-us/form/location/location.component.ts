import { Component, OnInit } from '@angular/core';
import { AbstractForm } from '../abstract-form.component';
import { CoordinatesService } from 'hazdev-ng-location-view';
import { FormatterService } from '@core/formatter.service';

@Component({
  selector: 'tell-us-form-location',
  styleUrls: ['./location.component.scss'],
  templateUrl: './location.component.html'
})
export class LocationComponent extends AbstractForm implements OnInit {
  geolocating = false;

  constructor(
    public coordinateService: CoordinatesService,
    public formatter: FormatterService
  ) {
    super();
  }

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

  ngOnInit() {}

  onAddressChange(evt: Event) {
    this.geolocating = false;

    // TODO :: Maybe fire off a geocode with the new input address and then
    //         re-set ciim_mapLat and ciim_mapLon to new values. Otherwise,
    //         server will do this for us (but maybe useful for embedded map).
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
}
