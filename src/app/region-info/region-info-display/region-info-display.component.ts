import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { NearbyCitiesService } from '../nearby-cities.service';
import { RegionsService, PlacesService } from 'hazdev-ng-geoserve-output';
import { Event } from '../../event';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'region-info-display',
  styleUrls: ['./region-info-display.component.scss'],
  templateUrl: './region-info-display.component.html'
})
export class RegionInfoDisplayComponent implements OnInit {

  private _event: Event;

  constructor(
    public citiesService: NearbyCitiesService,
    public placesService: PlacesService,
    public regionsService: RegionsService
  ) { }


  /**
   * Return the current event object being rendered.
   */
  get event(): Event {
    return this._event;
  }

  /**
   * Sets the internal _event property and uses it to fetch region information
   * from the RegionsService and places information from either the
   * PlacesService if no nearby-cities product associated with new event, or
   * from the NearbyCitiesService otherwise.
   *
   * @param event {Event}
   */
  @Input()
  set event(ev: Event) {
    let coordinates;

    this._event = ev;

    if (!this._event) {
      return;
    }

    if (this._event.geometry) {
      coordinates = {
        latitude: this._event.geometry.coordinates[1],
        longitude: this._event.geometry.coordinates[0]
      };
    }

    const product = this._event.getProduct('nearby-cities');

    if (product) {
      this.getNearbyCities(product);
    } else {
      this.getPlaces(coordinates);
    }

    this.getRegions(coordinates);
  }

  getNearbyCities(product: any) {
    this.citiesService.get(product);
  }

  getPlaces(coordinates: any) {
    if (
      coordinates &&
      (coordinates.latitude || coordinates.latitude === 0) &&
      (coordinates.longitude || coordinates.longitude === 0)
    ) {
      this.placesService.getPlaces(coordinates.latitude, coordinates.longitude);
    }
  }

  getRegions(coordinates: any) {
    if (
      coordinates &&
      (coordinates.latitude || coordinates.latitude === 0) &&
      (coordinates.longitude || coordinates.longitude === 0)
    ) {
      this.regionsService.getRegions(
        coordinates.latitude,
        coordinates.longitude
      );
    }
  }

  ngOnInit() {
  }
}
