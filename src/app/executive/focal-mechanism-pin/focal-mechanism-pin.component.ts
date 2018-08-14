import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { Tensor } from '@shared/beachball/tensor';


/**
 * Focal Mechanism Pin
 *
 * @param product
 *     focal-mechanmism pin
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'executive-focal-mechanism-pin',
  styleUrls: ['./focal-mechanism-pin.component.scss'],
  templateUrl: './focal-mechanism-pin.component.html'
})
export class FocalMechanismPinComponent {
  _product: any = null;
  link: String = '../focal-mechanism';
  tensor: Tensor = null;
  title: String = 'Focal Mechanism';

  @Input()
  set product(product: any) {
    this._product = product;
    this.tensor = Tensor.fromProduct(product);
  }

  get product() {
    return this._product;
  }
}
