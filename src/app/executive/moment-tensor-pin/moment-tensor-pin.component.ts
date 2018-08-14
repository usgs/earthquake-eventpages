import { Component, Input } from '@angular/core';

import { Tensor } from '@shared/beachball/tensor';

/**
 * Moment Tensor Pin
 *
 * @param product
 *     moment-tensor product
 */
@Component({
  selector: 'executive-moment-tensor-pin',
  templateUrl: './moment-tensor-pin.component.html',
  styleUrls: ['./moment-tensor-pin.component.scss']
})
export class MomentTensorPinComponent {
  _product: any = null;
  link = '../moment-tensor';
  title = 'Moment Tensor';
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
