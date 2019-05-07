import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { FormatterService } from '@core/formatter.service';
/**
 * Technical shake-alert summary component, shown in the expansion panel below
 * the header/title
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'technical-shake-alert-summary',
  styleUrls: ['./shake-alert-summary.component.scss'],
  templateUrl: './shake-alert-summary.component.html'
})
export class ShakeAlertSummaryComponent {
  // Table headers
  columnsToDisplay = ['catalog', 'time'];

  @Input()
  event: any;

  @Input()
  products: Array<any>;

  // router information
  router: Router;

  constructor(public formatterService: FormatterService, router: Router) {
    this.router = router;
  }

  /**
   * Returns a date object from a string
   * @param str
   *     String input used to create Date object
   * @returns {Date}
   */
  toDate(str: string) {
    return new Date(str);
  }
}
