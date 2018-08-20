import { Component } from '@angular/core';

import { EventService } from '@core/event.service';

/**
 * Generate intensity tab on dyfi product page
 */
@Component({
  selector: 'dyfi-intensity',
  styleUrls: ['./intensity.component.scss'],
  templateUrl: './intensity.component.html'
})
export class IntensityComponent {
  constructor(public eventService: EventService) {}
}
