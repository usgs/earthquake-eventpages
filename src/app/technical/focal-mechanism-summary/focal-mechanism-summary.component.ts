import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { Tensor } from '@shared/beachball/tensor';


/**
 * Focal mechanism component, renders a table with data
 * @param event
 *     The event input
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'technical-focal-mechanism-summary',
  styleUrls: ['./focal-mechanism-summary.component.scss'],
  templateUrl: './focal-mechanism-summary.component.html'
})
export class FocalMechanismSummaryComponent {
  _products: Array<any>;
  // MatTable headers
  columnsToDisplay = [
    'catalog',
    'mechanism',
    'nodalPlane1',
    'nodalPlane2',
    'source'
  ];

  @Input()
  event: any;

  tensors: Array<any> = [];

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
