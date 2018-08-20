import { Component } from '@angular/core';

import { EventService } from '@core/event.service';

/**
 * Display ZIP MAP tab on dyfi product page
 */
@Component({
  selector: 'dyfi-zip',
  styleUrls: ['./zip.component.scss'],
  templateUrl: './zip.component.html'
})
export class ZipComponent {
  constructor(public eventService: EventService) {}
}
