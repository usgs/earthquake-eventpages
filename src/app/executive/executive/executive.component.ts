import { Component, ViewEncapsulation } from '@angular/core';

import { EventService } from '@core/event.service';


/**
 * Executive summary page
 */
@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-executive',
  styleUrls: ['./executive.component.scss'],
  templateUrl: './executive.component.html'
})
export class ExecutiveComponent {
  constructor(public eventService: EventService) {}
}
