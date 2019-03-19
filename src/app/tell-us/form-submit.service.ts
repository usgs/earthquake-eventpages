import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { BehaviorSubject, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { FeltReportResponse } from './felt-report-response';
import { FeltReportReponseError } from './felt-report-reponse-error';
import { FeltReportResponseErrorDetails } from './felt-report-response-error-details';
import { FeltReport } from 'app/tell-us/felt-report';
import { environment } from 'environments/environment';
import { GeoService } from '@shared/geo.service';

const DYFI_FORM_VERSION = '1.12';

@Injectable()
export class FormSubmitService {
  formResponse$ = new BehaviorSubject<
    FeltReportResponse | FeltReportReponseError
  >(null);
  responseUrl = environment.DYFI_RESPONSE_URL;

  constructor(public geoService: GeoService, public httpClient: HttpClient) {}

  /**
   * Generate a FeltReportResponseError and update the formResponse$
   * BehaviorSubject
   *
   * @param code number
   *    http status code
   *
   * @param message string
   *    descriptive error messsage
   *
   */
  createErrorResponse(code, message) {
    if (!code && !message) {
      return;
    }

    const errorDetail: FeltReportResponseErrorDetails = {
      code: code,
      message: message
    };
    const error: FeltReportReponseError = {
      error: errorDetail
    };
    this.formResponse$.next(error);
  }

  /**
   * Form submission function called from submit component
   *
   * @param feltReport , the instance of the FeltReport model
   */
  onSubmit(feltReport: FeltReport): void {
    let params = new HttpParams();
    const validated = feltReport.valid;

    if (validated) {
      for (const key in feltReport) {
        if (feltReport.hasOwnProperty(key) && key !== 'location') {
          params = params.append(key, feltReport[key]);
        }
      }
      params = this.parseLocation(params, feltReport);
      params = params.append('format', 'json');
      params = params.append('form_version', DYFI_FORM_VERSION);

      // Post the form
      this.httpClient
        .post(this.responseUrl, params)
        .pipe(
          catchError(val => {
            // elegantly handle server error
            return of(val);
          })
        )
        .subscribe(response => {
          // if no error
          if (response && !response.error) {
            this.formResponse$.next(response);
          } else {
            const code = response.status ? response.status : null;
            const message = response.statusText
              ? response.statusText
              : 'Server Error';
            this.createErrorResponse(code, message);
          }
        });
    } else {
      const code = 400;
      const message = 'Error, invalid form entry';
      this.createErrorResponse(code, message);
    }
  }

  /**
   * Parse the location, add ciim_mapLat, ciim_mapLon, and ciim_mapAddress
   *
   * @param params
   * @param feltReport
   */
  parseLocation(params, feltReport) {
    let latitude = feltReport.ciim_mapLat;
    let longitude = feltReport.ciim_mapLon;
    const address = feltReport.ciim_mapAddress;
    const method = this.geoService.method$.value;

    if (latitude) {
      latitude = latitude.toString();
      params = params.append('ciim_mapLat', latitude);
    }

    if (longitude) {
      longitude = longitude.toString();
      params = params.append('ciim_mapLon', longitude);
    }

    // Omitting the lat/lng formatted string prevents an unecessary
    // geocode on the backend
    if (address && method === 'geocode') {
      // TODO, check if geocoded, if not wipe ciim_mapAddress
      params = params.append('ciim_mapAddress', address);
    } else {
      params = params.append('ciim_mapAddress', '');
    }

    return params;
  }
}
