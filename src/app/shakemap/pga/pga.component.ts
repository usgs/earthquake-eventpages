import { Component } from '@angular/core';

import { EventService } from '@core/event.service';

/**
 * PGA subcomponent, shows when the user selects the 'pga' tab from the main
 * shakemap component
 */
@Component({
  selector: 'shakemap-pga',
  templateUrl: './pga.component.html',
  styleUrls: ['./pga.component.scss']
})
export class PgaComponent {
  constructor(public eventService: EventService) {}
}
