import { Component } from '@angular/core';

import { EventService } from '@core/event.service';

/**
 * Impact summary for dyfi, pager, and shakemap summaries.
 */
@Component({
  selector: 'app-impact',
  styleUrls: ['./impact.component.scss'],
  templateUrl: './impact.component.html'
})
export class ImpactComponent {
  constructor(public eventService: EventService) {}
}
