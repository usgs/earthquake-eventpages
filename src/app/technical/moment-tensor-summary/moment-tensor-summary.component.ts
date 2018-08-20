import { Component, Input } from '@angular/core';

import { FormatterService } from '@core/formatter.service';
import { Tensor } from '@shared/beachball/tensor';

/**
 * Moment tensor component
 * @param event
 *     The event input
 */
@Component({
  selector: 'technical-moment-tensor-summary',
  styleUrls: ['./moment-tensor-summary.component.scss'],
  templateUrl: './moment-tensor-summary.component.html'
})
export class MomentTensorSummaryComponent {
  _products: Array<any>;
  // Table headers
  columnsToDisplay = [
    'catalog',
    'tensor',
    'magnitude',
    'depth',
    'percentDC',
    'source'
  ];
  @Input()
  event: any;
  tensors: Array<any> = [];

  constructor(public formatterService: FormatterService) {}

  /**
   * Setter for the products array
   * @param products
   *     The products array to set
   * @returns { Tensor }
   */
  @Input()
  set products(products: Array<any>) {
    this._products = products;
    this.tensors = (products || []).map(p => {
      return Tensor.fromProduct(p);
    });
  }

  /**
   * Getter for products array
   * @returns {Array<any>}
   */
  get products() {
    return this._products;
  }
}
