import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Router } from '@angular/router';

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
  changeDetection: ChangeDetectionStrategy.OnPush,
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

  // router information
  router: Router;

  constructor(router: Router) {
    this.router = router;
  }
}
