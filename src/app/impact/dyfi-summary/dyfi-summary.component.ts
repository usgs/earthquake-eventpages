import { Component, Input} from '@angular/core';

import { Event } from '../../event';


/**
 * renders dyfi summary table
 * @param event
 *    event from eventService
 * @param products
 *    DYFI products
 */
@Component({
  selector: 'impact-dyfi-summary',
  templateUrl: './dyfi-summary.component.html',
  styleUrls: ['./dyfi-summary.component.css']
})
export class DyfiSummaryComponent {

  // columns to be displayed
  public columnsToDisplay = [
    'catalog',
    'cdi',
    'responses',
    'source'
  ];

  @Input() event: Event;

  @Input() products: Array<any> = [];
}
