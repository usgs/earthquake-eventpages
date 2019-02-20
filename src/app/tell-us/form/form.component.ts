import {
  Component,
  OnChanges,
  SimpleChanges,
  Output,
  EventEmitter
} from '@angular/core';
import {
  HttpErrorResponse,
  HttpClient,
  HttpParams
} from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { FeltReportResponseErrorDetails } from '../felt-report-response-error-details';
import { FeltReportValidation } from '../felt-report-validation';
import { AbstractForm } from './abstract-form.component';
import { environment } from 'environments/environment';

/**
 * The main tell-us form which submits all DYFI information from user
 *
 */
@Component({
  selector: 'tell-us-form',
  styleUrls: ['./form.component.scss'],
  templateUrl: './form.component.html'
})
export class FormComponent extends AbstractForm implements OnChanges {
  // these answers control whether the submit button is enabled
  // others are populated as needed
  answers: any = {
    ciim_mapLat: null,
    ciim_mapLon: null,
    ciim_time: null,
    fldSituation_felt: null
  };
  error: HttpErrorResponse = null;
  @Output() formResponse = new EventEmitter<any>();
  responseUrl: string = environment.DYFI_RESPONSE_URL;
  validation: FeltReportValidation;

  constructor(public httpClient: HttpClient) {
    super();
  }

  /**
   * Error handler for http requests.
   * // TODO, re-evaluate handling server errors, maybe keep the form open
   * // and show a snackbar instead of emitting an error response
   */
  handleError(err: HttpErrorResponse): Observable<any> {
    this.error = err;
    // this.formResponse.emit(errorResponse);
    return of(this.error);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.hasOwnProperty('event')) {
      const event = changes.event.currentValue;
      if (event && event.id) {
        let time = event.properties.time || null;
        if (time) {
          time = new Date(time).toISOString();
          this.answers.ciim_time = time;
        }
        this.feltReport.eventid = event.id;
        this.feltReport.ciim_time = time;
      } else {
        this.feltReport.eventid = null;
        this.feltReport.ciim_time = null;
      }
    }
  }

  /**
   * Called when form is submitted. Validates data model, posts payload,
   * then errors or emits response object to parent tell-us component
   */
  onSubmit(): void {
    if (this.feltReport.fldSituation_felt) {
      this.answers.fldSituation_felt = this.feltReport.fldSituation_felt;
    }
    if (this.feltReport.ciim_mapLat) {
      this.answers.ciim_mapLat = this.feltReport.ciim_mapLat;
    }
    if (this.feltReport.ciim_mapLon) {
      this.answers.ciim_mapLon = this.feltReport.ciim_mapLon;
    }
    let params = new HttpParams();
    const validated = this.validateForm();
    if (validated) {
      for (const key in this.feltReport) {
        if (this.feltReport.hasOwnProperty(key)) {
          params = params.append(key, this.feltReport[key]);
        } else if (this.answers.hasOwnProperty(key)) {
          params = params.append(key, this.answers[key]);
        }
      }
      params = params.append('format', 'json');
      params = params.append('form_version', '1.10');
      // Post the form
      this.httpClient
        .post(this.responseUrl, params)
        .pipe(
          catchError(val => {
            return this.handleError(val);
          })
        )
        .subscribe(response => {
          // if no error
          if (response && !response.error) {
            // emit parsed response data/class
            this.formResponse.emit(response);
          } else {
            // emit FeltReportResponseErrorDetails
            this.formResponse.emit(this.returnErrorResponse(response));
          }
        });
    } else {
      // TODO: if form is invalid, possibly show snackbar
    }
  }

  /**
   * Helper function to build and return a FeltReportResponseErrorDetails
   * object
   *
   * @param err , the HttpErrorResponse object
   */
  returnErrorResponse(err: HttpErrorResponse): FeltReportResponseErrorDetails {
    const errorDetails: FeltReportResponseErrorDetails = {
      code: 500,
      message: 'Error from server'
    };
    try {
      errorDetails.code = err.status;
      errorDetails.message = err.message;
    } catch (e) {
      // do nothing
    }
    return errorDetails;
  }

  /**
   * Called to validate all form inputs
   *
   * @returns FeltReportValidation called from feltReport instance class
   */
  validateForm(): FeltReportValidation {
    return this.feltReport.valid;
  }
}
