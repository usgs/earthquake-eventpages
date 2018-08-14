import { Component } from '@angular/core';

import { EventService } from '@core/event.service';

/**
 * Intensity map showed when user selects the intensity tab from main shakemap
 */
@Component({
  selector: 'shakemap-intensity',
  styleUrls: ['./intensity.component.scss'],
  templateUrl: './intensity.component.html'
})
export class IntensityComponent {
  constructor(public eventService: EventService) {}
}
