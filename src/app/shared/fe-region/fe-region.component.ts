import { Component, Input } from '@angular/core';

import { GeoserveService } from '@core/geoserve.service';

/**
 * Shared fe region component for use with maps
 *
 * @param input
 *     FE region from the product
 */
@Component({
  selector: 'shared-fe-region',
  styleUrls: ['./fe-region.component.scss'],
  templateUrl: './fe-region.component.html'
})
export class FeRegionComponent {
  _latitude: number;
  _loading = false;
  _longitude: number;

  @Input()
  fe: any;

  constructor(public geoserveService: GeoserveService) {}

  /**
   * Setter for longitude
   * @param longitude
   *     The longitude of fe region
   */
  @Input()
  set longitude(longitude: number) {
    this._longitude = longitude;
    this.fetchFe(this._latitude, this._longitude);
  }

  /**
   * Setter for latitude
   * @param latitude
   *     The latitude of fe region
   */
  @Input()
  set latitude(latitude: number) {
    this._latitude = latitude;
    this.fetchFe(this._latitude, this._longitude);
  }

  /**
   * Getter for the component latitude
   */
  get latitude(): number {
    return this._latitude;
  }

  /**
   * Getter for the component longitude
   */
  get longitude(): number {
    return this._longitude;
  }

  /**
   * Calls http method in geoserve service to subscribe to fe region
   * @param latitude
   *     The latitude of fe region
   * @param longitude
   *     The longitude of fe region
   */
  fetchFe(latitude: number, longitude: number) {
    if (!(latitude || latitude === 0) || !(longitude || longitude === 0)) {
      this.fe = null;
      return;
    }

    this._loading = true;

    this.geoserveService.fe(latitude, longitude).subscribe(response => {
      this._loading = false;

      // Assumes each coordinate returns a single FE region.
      this.fe = response.fe.features[0];
    });
  }

  /**
   * Returns whether or not the page is rendering
   */
  isLoading(): boolean {
    return this._loading;
  }
}
