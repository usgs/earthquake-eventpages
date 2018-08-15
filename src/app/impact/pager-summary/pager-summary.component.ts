import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

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
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'impact-pager-summary',
  styleUrls: ['./pager-summary.component.scss'],
  templateUrl: './pager-summary.component.html'
})
export class PagerSummaryComponent {
  // columns to be displayed
  columnsToDisplay = ['catalog', 'alertlevel', 'source'];

  @Input()
  event: Event;

  @Input()
  products: Array<any> = [];
}
