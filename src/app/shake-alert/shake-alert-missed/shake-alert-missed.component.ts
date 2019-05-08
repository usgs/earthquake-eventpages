import { Component } from '@angular/core';

import { EventService } from '@core/event.service';

/**
 * ShakeAlert missed presentational component
 */
@Component({
  selector: 'shake-alert-missed',
  styleUrls: ['./shake-alert-missed.component.scss'],
  templateUrl: './shake-alert-missed.component.html'
})
export class ShakeAlertMissedComponent {
  constructor(public eventService: EventService) {}
}
