import { Component } from '@angular/core';

import { EventService } from '@core/event.service';

/**
 * PGA subcomponent, shows when the user selects the 'pga' tab from the main
 * shakemap component
 */
@Component({
  selector: 'shakemap-pga',
  styleUrls: ['./pga.component.scss'],
  templateUrl: './pga.component.html'
})
export class PgaComponent {
  constructor(public eventService: EventService) {}
}
