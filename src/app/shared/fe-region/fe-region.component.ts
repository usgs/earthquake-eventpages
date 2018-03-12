import { Component, Input } from '@angular/core';

import { GeoserveService } from '../../core/geoserve.service';


@Component({
  selector: 'shared-fe-region',
  templateUrl: './fe-region.component.html',
  styleUrls: ['./fe-region.component.css']
})
export class FeRegionComponent {

  @Input() fe: any;

  private _latitude: number;
  private _longitude: number;
  private _loading = false;

  constructor (
    public geoserveService: GeoserveService
  ) { }

  get latitude (): number {
    return this._latitude;
  }

  get longitude (): number {
    return this._longitude;
  }

  @Input() set longitude (longitude: number) {
    this._longitude = longitude;
    this.fetchFe(this._latitude, this._longitude);
  }

  @Input() set latitude (latitude: number) {
    this._latitude = latitude;
    this.fetchFe(this._latitude, this._longitude);
  }

  fetchFe (latitude: number, longitude: number) {
    if (!(latitude || latitude === 0) || !(longitude || longitude === 0)) {
      this.fe = null;
      return;
    }

    this._loading = true;

    this.geoserveService.fe(latitude, longitude).subscribe((response) => {
      this._loading = false;

      // Assumes each coordinate returns a single FE region.
      this.fe = response.fe.features[0];
    });
  }

  isLoading (): boolean {
    return this._loading;
  }
}
