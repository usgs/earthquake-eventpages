import { Component, Input} from '@angular/core';

import { Event } from '../../event';


/**
 * Renders shakemap summary table
 *
 * @param event
 *    event from eventService
 * @param products
 *    shakemap products
 */
@Component({
  selector: 'impact-shakemap-summary',
  templateUrl: './shakemap-summary.component.html',
  styleUrls: ['./shakemap-summary.component.css']
})
export class ShakemapSummaryComponent {

  // columns to be displayed
  public columnsToDisplay = [
    'catalog',
    'mmi',
    'source',
    'description'
  ];

  @Input() event: Event;

  @Input() products: Array<any> = [];
}
