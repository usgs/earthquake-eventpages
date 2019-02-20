import { FeltReportResponseErrorDetails } from './../felt-report-response-error-details';
import {
  HttpClient,
  HttpErrorResponse,
  HttpParams
} from '@angular/common/http';
import {
  Component,
  EventEmitter,
  Input,
  Output,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Event } from '../../event';
import { TellUsText } from '../form-language/tell-us-text';
import { FeltReport } from '../felt-report';
import { FeltReportValidation } from '../felt-report-validation';
import { AbstractForm } from './abstract-form.component';
import { environment } from 'environments/environment';

/**
 * The main tell-us form which submits all DYFI information from user
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
  error: any = null;
  @Input() event: Event;
  @Input() feltReport: FeltReport;
  @Output() formResponse = new EventEmitter<any>();
  @Input() labels: TellUsText;
  responseUrl = environment.DYFI_RESPONSE_URL;
  validation: FeltReportValidation;

  constructor(public httpClient: HttpClient) {
    super();
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

      this.feltReport.eventid = event.id;
      this.feltReport.ciim_time = time;
    } else {
      this.feltReport.eventid = null;
      this.feltReport.ciim_time = null;
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
          // if response is an object and not an observable<error>
          if (response && !response.error) {
            // emit parsed response data/class
            this.formResponse.emit(response);
          } else {
            // emit FeltReportResponseErrorDetails
            this.formResponse.emit(this.returnErrorResponse(response));
          }
        });
    } else {
      this.formResponse.emit({ error: 'form invalid' });
    }
  }

  /**
   * Error handler for http requests.
   * // TODO, re-evaluate handling server errors, maybe keep the form open
   * // and show a snackbar instead of emitting an error response
   */
  private handleError(err): Observable<any> {
    this.error = err;
    // this.formResponse.emit(errorResponse);
    return of(this.error);
  }

  /**
   * Helper function to build and return a FeltReportResponseErrorDetails
   * object
   *
   * @param err , the HttpErrorResponse object
   */
  private returnErrorResponse(
    err: HttpErrorResponse
  ): FeltReportResponseErrorDetails {
    const errorDetails = {
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
  private validateForm(): FeltReportValidation {
    return this.feltReport.valid;
  }
}
