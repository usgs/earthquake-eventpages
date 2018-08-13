import { Component, Input } from '@angular/core';

import { Tensor } from '../../shared/beachball/tensor';

/**
 * Focal Mechanism Pin
 *
 * @param product
 *     focal-mechanmism pin
 */
@Component({
  selector: 'executive-focal-mechanism-pin',
  templateUrl: './focal-mechanism-pin.component.html',
  styleUrls: ['./focal-mechanism-pin.component.scss']
})
export class FocalMechanismPinComponent {
  public _product: any = null;
  public link: String = '../focal-mechanism';
  public title: String = 'Focal Mechanism';
  public tensor: Tensor = null;

  @Input()
  set product(product: any) {
    this._product = product;
    this.tensor = Tensor.fromProduct(product);
  }

  get product() {
    return this._product;
  }
}
