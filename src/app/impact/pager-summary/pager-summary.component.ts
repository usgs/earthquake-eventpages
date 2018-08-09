import { Component, Input } from '@angular/core';

import { Event } from '../../event';


/**
 * Renders pager summary table
 *
 * @param
 *    event from eventService
 * @param
 *    pager products
 */
@Component({
  selector: 'impact-pager-summary',
  templateUrl: './pager-summary.component.html',
  styleUrls: ['./pager-summary.component.scss']
})
export class PagerSummaryComponent {

  // columns to be displayed
  public columnsToDisplay = [
    'catalog',
    'alertlevel',
    'source'
  ];

  @Input() event: Event;

  @Input() products: Array<any> = [];
}



