import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Router } from '@angular/router';

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
  changeDetection: ChangeDetectionStrategy.OnPush,
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

  // router information
  router: Router;

  constructor(router: Router) {
    this.router = router;
  }
}
