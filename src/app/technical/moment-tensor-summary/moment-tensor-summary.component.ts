import { Component, Input } from '@angular/core';

import { FormatterService } from '../../core/formatter.service';
import { Tensor } from '../../shared/beachball/tensor';


/**
 * Moment tensor component
 * @param event { any }
 */
@Component({
  selector: 'technical-moment-tensor-summary',
  templateUrl: './moment-tensor-summary.component.html',
  styleUrls: ['./moment-tensor-summary.component.scss']
})
export class MomentTensorSummaryComponent {


  // Table headers
  public columnsToDisplay = [
    'catalog',
    'tensor',
    'magnitude',
    'depth',
    'percentDC',
    'source'
  ];
  public _products: Array<any>;
  public tensors: Array<any> = [];

  @Input() event: any;


  constructor (public formatterService: FormatterService) { }


  /**
   * Setter for the products array
   * @param {Array<any>} products
   */
  @Input() set products (products: Array<any>) {
    this._products = products;
    this.tensors = (products || []).map((p) => {
      return Tensor.fromProduct(p);
    });
  }

  /**
   * Getter for products array
   * @returns {Array<any>}
   */
  get products () {
    return this._products;
  }

}
