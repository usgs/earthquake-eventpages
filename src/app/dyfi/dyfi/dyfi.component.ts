import { Component } from '@angular/core';

import { EventService } from '@core/event.service';

/**
 * generate dyfi product page
 */
@Component({
  selector: 'dyfi',
  styleUrls: ['./dyfi.component.scss'],
  templateUrl: './dyfi.component.html'
})
export class DyfiComponent {
  constructor(public eventService: EventService) {}
}
