import { Component, Input } from '@angular/core';

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
  styleUrls: ['./shakemap-summary.component.scss'],
  templateUrl: './shakemap-summary.component.html'
})
export class ShakemapSummaryComponent {
  // columns to be displayed
  columnsToDisplay = ['catalog', 'mmi', 'source', 'description'];

  @Input()
  event: Event;

  @Input()
  products: Array<any> = [];
}
