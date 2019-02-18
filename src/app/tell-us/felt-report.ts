import { Location } from './location';
import { FeltReportValidation } from './felt-report-validation';

const _locationValid = (location: Location): boolean => {
  if (
    location &&
    // Either has an address
    ((location.address && location.address !== '') ||
      // Or has coordinates
      ((location.latitude || location.latitude === 0) &&
        (location.longitude || location.longitude === 0)))
  ) {
    return true;
  } else {
    return false;
  }
};

export class FeltReport {
  get ciim_mapAddress(): string {
    try {
      return this.location.address;
    } catch (e) {
      return null;
    }
  }

  get ciim_mapLat(): number {
    try {
      return this.location.latitude;
    } catch (e) {
      return null;
    }
  }

  get ciim_mapLon(): number {
    try {
      return this.location.longitude;
    } catch (e) {
      return null;
    }
  }

  get valid(): FeltReportValidation {
    let value = true;
    const errors = [];

    // Felt
    if (!(this.fldSituation_felt || this.fldSituation_felt === 0)) {
      value = false;
      errors.push('fldSituation_felt_error');
    }

    // Time
    if (!this.ciim_time) {
      value = false;
      errors.push('ciim_time_error');
    }

    // Location
    if (!_locationValid(this.location)) {
      value = false;
      errors.push('ciim_mapAddress_error');
    }

    return {
      errors: errors,
      value: value
    };
  }

  set ciim_mapAddress(address: string) {
    if (this.location) {
      this.location.address = address;
    }
  }

  // Must disable variable name linting so we can match input fields
  // tslint:disable:variable-name
  ciim_mapConfidence: number;
  ciim_time: string;
  'd_text[]': Array<string>;
  eventid: string;
  fldContact_comments: string;
  fldContact_email: string;
  fldContact_name: string;
  fldContact_phone: string;
  fldEffects_appliances: string;
  fldEffects_doors: string;
  fldEffects_furniture: string;
  fldEffects_pictures: string;
  fldEffects_shelved: string;
  fldEffects_sounds: string;
  fldEffects_walls: string;
  fldExperience_reaction: string;
  fldExperience_response: string;
  fldExperience_response_Other: string;
  fldExperience_shaking: string;
  fldExperience_stand: string;
  fldSituation_felt: number;
  fldSituation_others: string;
  fldSituation_situation: string;
  fldSituation_situation_Other: string;
  fldSituation_sleep: string;
  form_version: string;
  format: string;
  isTrusted: boolean;
  language: string;
  location: Location;
  // tslint:enable:variable-name
}
