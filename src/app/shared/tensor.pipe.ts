import { Pipe, PipeTransform } from '@angular/core';

import { Tensor } from './beachball/tensor';


@Pipe({
  name: 'sharedTensor'
})
export class TensorPipe implements PipeTransform {

  /**
   * Gets tensor from the product
   *
   * @param product
   *     The moment-tensor | focal-mechanism product
   *
   * @return {any | null}
   *     tensor object
   */
  transform (product: any): any | null {
    if (!product) {
      return null;
    }

    return Tensor.fromProduct(product);
  }

}
