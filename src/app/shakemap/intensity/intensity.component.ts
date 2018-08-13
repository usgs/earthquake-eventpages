import { Component } from '@angular/core';

import { EventService } from '../../core/event.service';

/**
 * Intensity map showed when user selects the intensity tab from main shakemap
 */
@Component({
  selector: 'shakemap-intensity',
  templateUrl: './intensity.component.html',
  styleUrls: ['./intensity.component.scss']
})
export class IntensityComponent {
  constructor(public eventService: EventService) {}
}
