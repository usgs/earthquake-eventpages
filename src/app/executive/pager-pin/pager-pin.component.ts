import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit
} from '@angular/core';

/**
 * Pager Pin
 *
 * @param product
 *     losspager product
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'executive-pager-pin',
  styleUrls: ['./pager-pin.component.scss'],
  templateUrl: './pager-pin.component.html'
})
export class PagerPinComponent implements OnInit {
  link = '../pager';
  pending: boolean;
  @Input()
  product: any;
  title = 'PAGER';

  isPending(): boolean {
    if (this.product.properties.alertlevel.toLowerCase() === 'pending') {
      return true;
    } else {
      return false;
    }
  }

  ngOnInit() {
    this.pending = this.isPending();
  }
}
