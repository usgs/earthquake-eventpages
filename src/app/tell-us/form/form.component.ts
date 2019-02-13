import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
  HttpResponse
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
import { Response } from '../response';
import { TellUsText } from '../form-language/tell-us-text';
import { environment } from 'environments/environment';
import * as QuestionData from './questions.json';
import { FormLanguageService } from '../form-language.service';
import { Coordinates } from '../location/location.component';
import { FeltReport } from '../felt-report';
import { AbstractForm } from './abstract-form.component';

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
  ngOnChanges(changes: SimpleChanges) {
    if (changes.hasOwnProperty('event')) {
      const event = changes.event.currentValue;
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
    }
  }

  //   responseUrl = environment.DYFI_RESPONSE_URL;

  //   /**
  //    * Called when form is submitted. Passes answers back to dialog opener.
  //    */
  //   onSubmit() {
  //     let params = new HttpParams();
  //     const validated = this.validateForm();
  //     if (validated) {
  //       for (const key in this.answers) {
  //         if (this.answers.hasOwnProperty(key)) {
  //           params = params.append(key, this.answers[key]);
  //         }
  //       }
  //       params = params.append('format', 'json');
  //       params = params.append('form_version', '1.10');
  //       // Post the form
  //       this.httpClient
  //         .post(this.responseUrl, params)
  //         .pipe(
  //           map(this.parseResponse),
  //           catchError(this.handleError())
  //         )
  //         .subscribe(response => {
  //           this.formResponse.emit(response);
  //         });
  //     }
  //   }
  //   /**
  //    * Error handler for http requests.
  //    *
  //    * @returns observable error
  //    */
  //   private handleError() {
  //     return (error: HttpErrorResponse): Observable<any> => {
  //       return of(error);
  //     };
  //   }
}
