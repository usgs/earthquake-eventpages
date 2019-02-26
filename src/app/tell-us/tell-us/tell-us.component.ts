import { Component } from '@angular/core';

import { EventService } from '@core/event.service';

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
export class TellUsComponent {
  constructor(
    public eventService: EventService,
    public formSubmitService: FormSubmitService,
    public languageService: FormLanguageService
  ) {}
}
