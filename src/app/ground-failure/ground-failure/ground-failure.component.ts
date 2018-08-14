import { Component, ViewEncapsulation } from '@angular/core';

import { EventService } from '@core/event.service';

/**
 * Display ground-failure product page
 */
@Component({
  selector: 'ground-failure',
  templateUrl: './ground-failure.component.html',
  styleUrls: ['./ground-failure.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class GroundFailureComponent {
  constructor(public eventService: EventService) {}
}
