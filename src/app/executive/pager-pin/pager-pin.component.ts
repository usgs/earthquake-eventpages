import { Component, Input } from '@angular/core';

/**
 * Pager Pin
 *
 * @param product
 *     losspager product
 */
@Component({
  selector: 'executive-pager-pin',
  styleUrls: ['./pager-pin.component.scss'],
  templateUrl: './pager-pin.component.html'
})
export class PagerPinComponent {
  link = '../pager';
  @Input()
  product: any;
  title = 'PAGER';
}
