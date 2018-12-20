import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'technical-finite-fault-summary',
  styleUrls: ['./finite-fault-summary.component.scss'],
  templateUrl: './finite-fault-summary.component.html'
})
export class FiniteFaultSummaryComponent {
  // Table headers
  columnsToDisplay = ['catalog', 'derived-magnitude', 'maximum-slip', 'source'];

  @Input()
  event: any;

  @Input()
  products: Array<any>;

  // router information
  router: Router;

  constructor(router: Router) {
    this.router = router;
  }
}
