import { Component, Input } from '@angular/core';

import { Tensor } from '../../shared/beachball/tensor';


/**
 * Focal mechanism component
 * @param event { any }
 */
@Component({
  selector: 'technical-focal-mechanism-summary',
  templateUrl: './focal-mechanism-summary.component.html',
  styleUrls: ['./focal-mechanism-summary.component.scss']
})
export class FocalMechanismSummaryComponent {


  // MatTable headers
  public columnsToDisplay = [
    'catalog',
    'mechanism',
    'nodalPlane1',
    'nodalPlane2',
    'source'
  ];
  public _products: Array<any>;
  public tensors: Array<any> = [];

  @Input() event: any;


  /**
   * Setter to set the products array
   * @param {Array<any>} products
   */
  @Input() set products (products: Array<any>) {
    this._products = products;
    this.tensors = (products || []).map((p) => {
      return Tensor.fromProduct(p);
    });
  }

  /**
   * Get the products array
   * @returns {Array<any>}
   */
  get products () {
    return this._products;
  }

}

