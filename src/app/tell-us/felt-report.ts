export interface FeltReportValidation {
  errors: Array<string>;
  value: boolean;
}

export class FeltReport {
  'ciim_mapAddress': string;
  'ciim_mapLat': number;
  'ciim_mapLon': number;
  'ciim_time': string;
  'eventid': string;
  'fldSituation_felt': number;

  get valid(): FeltReportValidation {
    let value = true;
    const errors = [];

    // Felt
    if (!this._isSet(this.fldSituation_felt)) {
      value = false;
      errors.push('fldSituation_felt_error');
    }

    // Time
    if (!this._isSet(this.ciim_time)) {
      value = false;
      errors.push('ciim_time_error');
    }

    // Location
    if (
      // no address
      !this._isSet(this.ciim_mapAddress) &&
      // and no coordinates
      (!this._isSet(this.ciim_mapLat) || !this._isSet(this.ciim_mapLon))
    ) {
      value = false;
      errors.push('ciim_mapAddress_error');
    }

    return {
      errors: errors,
      value: value
    };
  }

  private _isSet(value: any): boolean {
    if (typeof value === 'undefined' || value === null || value === '') {
      return false;
    }

    return true;
  }
}
