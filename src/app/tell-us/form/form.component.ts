import { FeltReportResponse } from './../felt-report-response';
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
import { catchError, map } from 'rxjs/operators';

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
      this.onEvent(changes.event.currentValue);
    }
    if (changes.hasOwnProperty('labels')) {
      this.onLabels(changes.labels.currentValue);
    }
  }

  onEvent(event: Event): void {
    if (event && event.id) {
      let time = event.properties.time || null;
      if (time) {
        time = new Date(time).toISOString();
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
    let params = new HttpParams();
    const validated = this.validateForm();
    if (validated) {
      for (const key in this.feltReport) {
        if (this.feltReport.hasOwnProperty(key)) {
          params = params.append(key, this.feltReport[key]);
        }
      }
      params = params.append('format', 'json');
      params = params.append('form_version', '1.10');
      // Post the form
      this.httpClient
        .post(this.responseUrl, params)
        .pipe(
          map(this.parseResponse),
          catchError(this.handleError())
        )
        .subscribe(response => {
          if (response) {
            // emit parsed response data/class
            this.formResponse.emit(response);
          }
        });
    } else {
      this.formResponse.emit({ error: 'form invalid' });
    }
  }

  /**
   * Error handler for http requests.
   */
  private handleError(): (error: HttpErrorResponse) => Observable<any> {
    return error => {
      return of(this.error);
    };
  }

  /**
   * Parse the response data
   *
   * @param resData the response data
   */
  private parseResponse(resData: any): FeltReportResponse | null {
    // Todo return response error interface type if error
    if (resData) {
      const feltReportResponse: FeltReportResponse = {
        ciim_mapLat: resData.ciim_mapLat,
        ciim_mapLon: resData.ciim_mapLon,
        ciim_time: resData.ciim_time,
        eventid: resData.eventid || 'none',
        fldContact_email: resData.fldContact_email,
        fldContact_name: resData.fldContact_name,
        fldContact_phone: resData.fldContact_phone,
        form_version: resData.form_version,
        // currently never sent by server, but possible ...
        // nresp?: string;
        your_cdi: resData.your_cdi
      };
      return feltReportResponse;
    }
    return resData;
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
