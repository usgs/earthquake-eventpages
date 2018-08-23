import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { Tensor } from '@shared/beachball/tensor';


/**
 * Moment Tensor Pin
 *
 * @param product
 *     moment-tensor product
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'executive-moment-tensor-pin',
  styleUrls: ['./moment-tensor-pin.component.scss'],
  templateUrl: './moment-tensor-pin.component.html'
})
export class MomentTensorPinComponent {
  _product: any = null;
  link = '../moment-tensor';
  tensor: Tensor = null;
  title = 'Moment Tensor';

  @Input()
  set product(product: any) {
    this._product = product;
    this.tensor = Tensor.fromProduct(product);
  }

  get product() {
    return this._product;
  }
}
