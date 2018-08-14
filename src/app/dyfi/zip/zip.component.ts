import { Component } from '@angular/core';

import { EventService } from '@core/event.service';

/**
 * Display ZIP MAP tab on dyfi product page
 */
@Component({
  selector: 'dyfi-zip',
  templateUrl: './zip.component.html',
  styleUrls: ['./zip.component.scss']
})
export class ZipComponent {
  constructor(public eventService: EventService) {}
}
