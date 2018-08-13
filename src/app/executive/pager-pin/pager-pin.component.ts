import { Component, Input } from '@angular/core';

/**
 * Pager Pin
 *
 * @param product
 *     losspager product
 */
@Component({
  selector: 'executive-pager-pin',
  templateUrl: './pager-pin.component.html',
  styleUrls: ['./pager-pin.component.scss']
})
export class PagerPinComponent {
  public link = '../pager';
  public title = 'PAGER';

  @Input()
  product: any;
}
