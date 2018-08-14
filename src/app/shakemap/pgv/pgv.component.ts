import { Component } from '@angular/core';

import { EventService } from '@core/event.service';

/**
 * PGV subcomponent, shows when user selects 'pgv' tab from main shakemap
 * component
 */
@Component({
  selector: 'shakemap-pgv',
  templateUrl: './pgv.component.html',
  styleUrls: ['./pgv.component.scss']
})
export class PgvComponent {
  constructor(public eventService: EventService) {}
}
