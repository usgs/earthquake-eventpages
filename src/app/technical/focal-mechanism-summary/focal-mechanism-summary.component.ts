import { Component, Input } from '@angular/core';

import { Tensor } from '@shared/beachball/tensor';

/**
 * Focal mechanism component, renders a table with data
 * @param event
 *     The event input
 */
@Component({
  selector: 'technical-focal-mechanism-summary',
  templateUrl: './focal-mechanism-summary.component.html',
  styleUrls: ['./focal-mechanism-summary.component.scss']
})
export class FocalMechanismSummaryComponent {
  // MatTable headers
  columnsToDisplay = [
    'catalog',
    'mechanism',
    'nodalPlane1',
    'nodalPlane2',
    'source'
  ];
  _products: Array<any>;
  tensors: Array<any> = [];

  @Input()
  event: any;

  /**
   * Setter to set the products array
   * @param products
   *     The products array
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
   * Get the products array
   * @returns {Array<any>}
   */
  get products() {
    return this._products;
  }
}
