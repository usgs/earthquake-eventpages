import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { BehaviorSubject, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { FeltReportResponse } from './felt-report-response';
import { FeltReportReponseError } from './felt-report-reponse-error';
import { FeltReportResponseErrorDetails } from './felt-report-response-error-details';
import { FeltReport } from 'app/tell-us/felt-report';
import { environment } from 'environments/environment.e2e';

const DYFI_FORM_VERSION = '1.11';

@Injectable()
export class FormSubmitService {
  formResponse$ = new BehaviorSubject<
    FeltReportResponse | FeltReportReponseError
  >(null);
  responseUrl = environment.DYFI_RESPONSE_URL;

  constructor(public httpClient: HttpClient) {}

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
        if (feltReport.hasOwnProperty(key)) {
          if (key === 'location') {
            params = params.append(
              'ciim_mapLat',
              feltReport.ciim_mapLat.toString()
            );
            params = params.append(
              'ciim_mapLon',
              feltReport.ciim_mapLon.toString()
            );
            params = params.append(
              'ciim_mapAddress',
              feltReport.ciim_mapAddress
            );
          } else {
            params = params.append(key, feltReport[key]);
          }
        }
      }
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
}
