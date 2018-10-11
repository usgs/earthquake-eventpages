import { Component } from '@angular/core';

import { EventService } from '@core/event.service';

/**
 * Display summary tab on ground-failure product page
 */
@Component({
  selector: 'ground-failure-summary',
  styleUrls: ['./summary.component.scss'],
  templateUrl: './summary.component.html'
})
export class SummaryComponent {
  constructor(public eventService: EventService) {}
}
