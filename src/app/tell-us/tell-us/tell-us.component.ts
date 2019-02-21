import { Component, OnDestroy, OnInit } from '@angular/core';

import { EventService } from '@core/event.service';
import { Subscription } from 'rxjs';

import { FeltReportResponse } from './../felt-report-response';
import { FeltReportReponseError } from './../felt-report-reponse-error';
import { FormLanguageService } from '../form-language.service';
import { FormSubmitService } from '../form-submit.service';

/**
 * Main component that handles the displaying of the tell us form and displays
 * server success/error response after submission of the form
 */
@Component({
  selector: 'tell-us-tell-us',
  styleUrls: ['./tell-us.component.scss'],
  templateUrl: './tell-us.component.html'
})
export class TellUsComponent implements OnDestroy, OnInit {
  // Form response received from submit
  formResponse$: FeltReportResponse | FeltReportReponseError;
  formResponseSub: Subscription;

  constructor(
    public eventService: EventService,
    public formSubmitService: FormSubmitService,
    public languageService: FormLanguageService
  ) {}

  ngOnDestroy() {
    this.formResponseSub.unsubscribe();
  }

  ngOnInit() {
    this.formResponseSub = this.formSubmitService.formResponse.subscribe(
      response => {
        if (response) {
          this.formResponse$ = response;
        }
      }
    );
  }
}
