import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges,
  SimpleChange
} from '@angular/core';
import { AbstractForm } from '../../abstract-form.component';
import * as L from 'leaflet';
import { FeltReport } from 'app/tell-us/felt-report';
import { FormatterService } from '@core/formatter.service';

const DEFAULT_ICON_URL =
  'data:image/png;base64,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' +
  'K5CYII=';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'tell-us-form-location-map',
  styleUrls: ['./map.component.scss'],
  templateUrl: './map.component.html'
})
export class MapComponent extends AbstractForm implements OnChanges, OnInit {
  @Input()
  set location(location: any) {
    console.log('set Location -> updatePin()');
    this.updatePin();
  }
  _mapShown: boolean;
  mapBounds: Array<Array<number>>;
  pin: L.Marker;

  @Input()
  set mapShown(mapShown: boolean) {
    // set location the first time the map is expanded
    if (mapShown === this._mapShown) {
      return;
    }
    this._mapShown = mapShown;

    // update FeltReport model with epicenter location
    if (!this.feltReport.location) {
      this.updateFeltReportLocation();
    }
  }

  constructor(public formatter: FormatterService) {
    super();
  }

  get mapShown() {
    return this._mapShown;
  }

  getLatLng(feltReport = this.feltReport, event = this.event): Array<number> {
    let latLng;

    if (
      feltReport &&
      feltReport.location &&
      (feltReport.location.latitude || feltReport.location.latitude === 0) &&
      (feltReport.location.latitude || feltReport.location.latitude === 0)
    ) {
      latLng = [feltReport.location.latitude, feltReport.location.longitude];
    } else if (event && event.geometry && event.geometry.coordinates) {
      const coordinates = event.geometry.coordinates;
      latLng = [coordinates[1], coordinates[0]];
    } else {
      latLng = [0.0, 0.0];
    }

    return latLng;
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.hasOwnProperty('event')) {
      this.onEventChange(changes.event);
    }
    if (changes.hasOwnProperty('feltReport')) {
      this.onFeltReportChange(changes.feltReport);
    }
  }

  ngOnInit() {
    this.pin = L.marker([0, 0], {
      draggable: true,
      icon: L.icon({
        iconAnchor: [12, 41],
        iconSize: [25, 41],
        iconUrl: DEFAULT_ICON_URL,
        shadowSize: [0, 0],
        tooltipAnchor: [16, -28]
      })
    });
    this.pin.enabled = true;

    this.updatePin();
  }

  onCoordinateChange(feltReport: FeltReport): void {
    this.updatePin(feltReport, this.event);
  }

  onEventChange(change: SimpleChange): void {
    this.updatePin(this.feltReport, change.currentValue);
  }

  onFeltReportChange(change: SimpleChange): void {
    this.updatePin(change.currentValue, this.event);
  }

  /**
   * If no felt report location is provided, use the event epicenter as the
   * user's felt location.
   */
  updateFeltReportLocation(feltReport = this.feltReport, event = this.event) {
    const latLng = this.getLatLng();
    if (latLng) {
      const latitude = latLng[0];
      const longitude = latLng[1];
      const address = this.formatter.location(latitude, longitude, 3);
      this.feltReport.location = {
        address: address,
        latitude: latitude,
        longitude: longitude
      };
    }
  }

  updatePin(feltReport = this.feltReport, event = this.event) {
    if (!this.pin) {
      return;
    }

    const latLng = this.getLatLng(feltReport, event);
    const lat = latLng[0];
    const lng = latLng[1];
    const mapRadius = 2.0; // degrees

    this.pin.setLatLng(latLng);
    if (lat === 0 && lng === 0) {
      this.mapBounds = [[85.0, -179.0], [-85.0, 179.0]];
    } else {
      this.mapBounds = [
        [lat + mapRadius, lng + mapRadius],
        [lat - mapRadius, lng - mapRadius]
      ];
    }
  }
}
