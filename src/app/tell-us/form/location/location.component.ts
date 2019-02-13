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
  constructor(
    public coordinateService: CoordinatesService,
    public formatter: FormatterService
  ) {
    super();
  }

  geolocate() {
    try {
      navigator.geolocation.getCurrentPosition(position => {
        return this.onGeolocateResult(position);
      });
    } catch (e) {
      console.log(`Failed geolocation: ${e}`);
    }
  }

  ngOnInit() {}

  onAddressChange(evt: Event) {
    this.feltReport.ciim_mapLat = null;
    this.feltReport.ciim_mapLon = null;

    // TODO :: Maybe fire off a geocode with the new input address and then
    //         re-set ciim_mapLat and ciim_mapLon to new values. Otherwise,
    //         server will do this for us (but maybe useful for embedded map).
  }

  onGeolocateResult(position: Position) {
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

    this.feltReport.ciim_mapLat = latitude;
    this.feltReport.ciim_mapLon = longitude;
    this.feltReport.ciim_mapAddress = this.formatter.location(
      latitude,
      longitude,
      confidence
    );
  }
}
