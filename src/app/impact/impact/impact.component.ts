import { Component } from '@angular/core';

import { EventService } from '../../core/event.service';

/**
 * Impact summary for dyfi, pager, and shakemap summaries.
 */
@Component({
  selector: 'app-impact',
  templateUrl: './impact.component.html',
  styleUrls: ['./impact.component.scss']
})
export class ImpactComponent {
  constructor(public eventService: EventService) {}
}
