import { Component } from '@angular/core';

import { EventService } from '@core/event.service';

/**
 * Generate intensity tab on dyfi product page
 */
@Component({
  selector: 'dyfi-intensity',
  templateUrl: './intensity.component.html',
  styleUrls: ['./intensity.component.scss']
})
export class IntensityComponent {
  constructor(public eventService: EventService) {}
}
