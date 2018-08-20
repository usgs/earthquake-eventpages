import { Component } from '@angular/core';

import { EventService } from '@core/event.service';

/**
 * Scaffold out the tab list for the Origin Module pages
 */
@Component({
  selector: 'origin',
  styleUrls: ['./origin.component.scss'],
  templateUrl: './origin.component.html'
})
export class OriginComponent {
  constructor(public eventService: EventService) {}
}
