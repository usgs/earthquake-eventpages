import { Component, Input } from '@angular/core';

import { Tensor } from '@shared/beachball/tensor';

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
  _product: any = null;
  link: String = '../focal-mechanism';
  title: String = 'Focal Mechanism';
  tensor: Tensor = null;

  @Input()
  set product(product: any) {
    this._product = product;
    this.tensor = Tensor.fromProduct(product);
  }

  get product() {
    return this._product;
  }
}
