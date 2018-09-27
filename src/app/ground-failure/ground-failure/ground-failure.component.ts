import { Component } from '@angular/core';

import { EventService } from '@core/event.service';

/**
 * Display ground-failure product page
 */
@Component({
  selector: 'ground-failure',
  styleUrls: ['./ground-failure.component.scss'],
  templateUrl: './ground-failure.component.html'
})
export class GroundFailureComponent {
  constructor(public eventService: EventService) {}
}
