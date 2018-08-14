import { Component } from '@angular/core';

import { EventService } from '@core/event.service';

/**
 * Scaffold out the tab list for the Origin Module pages
 */
@Component({
  selector: 'origin',
  templateUrl: './origin.component.html',
  styleUrls: ['./origin.component.scss']
})
export class OriginComponent {
  constructor(public eventService: EventService) {}
}
