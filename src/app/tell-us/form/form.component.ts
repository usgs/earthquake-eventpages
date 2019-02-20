import { Component, OnChanges, SimpleChanges } from '@angular/core';

import { Event } from '../../event';
import { TellUsText } from '../form-language/tell-us-text';

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

  onLabels(labels: TellUsText): void {
    this.feltReport.language = labels.id;
  }

  // This is here so that the build will pass but needs to actually
  // do something in the future.
  onSubmit() {
    return;
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
// }
