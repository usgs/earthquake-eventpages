import { Component } from '@angular/core';

import { EventService } from '@core/event.service';

/**
 * PGV subcomponent, shows when user selects 'pgv' tab from main shakemap
 * component
 */
@Component({
  selector: 'shakemap-pgv',
  styleUrls: ['./pgv.component.scss'],
  templateUrl: './pgv.component.html'
})
export class PgvComponent {
  constructor(public eventService: EventService) {}
}
