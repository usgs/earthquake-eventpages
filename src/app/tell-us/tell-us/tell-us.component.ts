import { Component, OnInit } from '@angular/core';

import { EventService } from '@core/event.service';
import { HttpErrorResponse } from '@angular/common/http';
import { FormLanguageService } from '../form-language.service';

/**
 * Main component that handles the displaying of the tell us form and displays
 * server success/error response after submission of the form
 */
@Component({
  selector: 'tell-us-tell-us',
  styleUrls: ['./tell-us.component.scss'],
  templateUrl: './tell-us.component.html'
})
export class TellUsComponent implements OnInit {
  // Form response received from submit
  formResponse: any; // TODO :: Create and use specific response model

  constructor(
    public eventService: EventService,
    public languageService: FormLanguageService
  ) {}

  ngOnInit() {}

  /**
   * Handles the dialog closing, and checks to see if there is a dyfi response
   *
   * @param response
   *     dyfi response or HttpErrorResponse object
   */
  onFormResponse(response: any | HttpErrorResponse) {
    this.formResponse = response;
  }
}
