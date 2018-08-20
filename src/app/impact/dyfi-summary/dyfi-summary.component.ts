import { Component, Input } from '@angular/core';

import { Event } from '../../event';

/**
 * renders dyfi summary table
 *
 * @param event
 *    event from eventService
 * @param products
 *    DYFI products
 */
@Component({
  selector: 'impact-dyfi-summary',
  styleUrls: ['./dyfi-summary.component.scss'],
  templateUrl: './dyfi-summary.component.html'
})
export class DyfiSummaryComponent {
  // columns to be displayed
  columnsToDisplay = ['catalog', 'cdi', 'responses', 'source'];

  @Input()
  event: Event;

  @Input()
  products: Array<any> = [];
}
