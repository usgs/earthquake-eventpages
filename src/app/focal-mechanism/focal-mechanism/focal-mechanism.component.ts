import { Component } from '@angular/core';

import { EventService } from '@core/event.service';

/**
 * Scaffold Focal Mechanism product page
 */
@Component({
  selector: 'focal-mechanism',
  styleUrls: ['./focal-mechanism.component.scss'],
  templateUrl: './focal-mechanism.component.html'
})
export class FocalMechanismComponent {
  constructor(public eventService: EventService) {}
}
