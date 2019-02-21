import { FeltReport } from 'app/tell-us/felt-report';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { BehaviorSubject, of } from 'rxjs';

import { FeltReportResponse } from './felt-report-response';
import { FeltReportReponseError } from './felt-report-reponse-error';
import { environment } from 'environments/environment.e2e';
import { catchError } from 'rxjs/operators';
import { FeltReportResponseErrorDetails } from './felt-report-response-error-details';

@Injectable()
export class FormSubmitService {
  formResponse = new BehaviorSubject<
    FeltReportResponse | FeltReportReponseError
  >(null);
  responseUrl = environment.DYFI_RESPONSE_URL;

  constructor(public httpClient: HttpClient) {}

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
          params = params.append(key, feltReport[key]);
        }
      }
      if (feltReport.location) {
        params = params.append(
          'ciim_mapLat',
          feltReport.location.latitude.toString()
        );
        params = params.append(
          'ciim_mapLon',
          feltReport.location.longitude.toString()
        );
      }
      params = params.append('format', 'json');
      params = params.append('form_version', '1.11');
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
            // emit parsed response data/class
            this.formResponse.next(response);
          } else {
            // TODO create and emit FeltReportResponseError
            // emit FeltReportResponseErrorDetails
            this.formResponse.next(response);
          }
        });
    } else {
      const errorDetail: FeltReportResponseErrorDetails = {
        code: null,
        message: 'Error, form invalid'
      };
      const error: FeltReportReponseError = {
        error: errorDetail
      };
      this.formResponse.next(error);
    }
  }
}
