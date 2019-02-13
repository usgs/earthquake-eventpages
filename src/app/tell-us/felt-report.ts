import { EventEmitter } from '@angular/core';

export interface FeltReportValidation {
  errors: Array<string>;
  value: boolean;
}

export class FeltReport {
  set ciim_mapLat(lat: number) {
    this._ciim_mapLat = lat;
    this._coordinateChange();
  }

  get ciim_mapLat(): number {
    return this._ciim_mapLat;
  }

  set ciim_mapLon(lon: number) {
    this._ciim_mapLon = lon;
    this._coordinateChange();
  }

  get ciim_mapLon(): number {
    return this._ciim_mapLon;
  }

  get valid(): FeltReportValidation {
    let value = true;
    const errors = [];

    // Felt
    if (!this.isSet(this.fldSituation_felt)) {
      value = false;
      errors.push('fldSituation_felt_error');
    }

    // Time
    if (!this.isSet(this.ciim_time)) {
      value = false;
      errors.push('ciim_time_error');
    }

    // Location
    if (
      // no address
      !this.isSet(this.ciim_mapAddress) &&
      // and no coordinates
      (!this.isSet(this.ciim_mapLat) || !this.isSet(this.ciim_mapLon))
    ) {
      value = false;
      errors.push('ciim_mapAddress_error');
    }

    return {
      errors: errors,
      value: value
    };
  }

  // Must disable variable name linting so we can match input fields
  // tslint:disable:variable-name
  ciim_mapAddress: string;
  ciim_time: string;
  coordinates$ = new EventEmitter<any>();
  eventid: string;
  fldSituation_felt: number;

  private _ciim_mapLat: number;
  private _ciim_mapLon: number;
  // tslint:enable:variable-name

  isSet(value: any): boolean {
    if (typeof value === 'undefined' || value === null || value === '') {
      return false;
    }

    return true;
  }

  private _coordinateChange(): void {
    const lat = this.ciim_mapLat;
    const lon = this.ciim_mapLon;

    if (this.isSet(lat) && this.isSet(lon)) {
      this.coordinates$.emit({ latitude: lat, longitude: lon });
    }
  }
}
