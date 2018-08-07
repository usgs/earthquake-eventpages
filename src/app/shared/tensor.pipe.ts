import { Pipe, PipeTransform } from '@angular/core';

import { Tensor } from './beachball/tensor';


/**
 * Shared Tensor pipe, returns the tensor object from the product
 * @returns {any}
 */
@Pipe({
  name: 'sharedTensor'
})
export class TensorPipe implements PipeTransform {


  /**
   * Returns tensor from product
   * @param product
   *     The product
   * @returns {any | null}
   */
  transform (product: any): any | null {
    if (!product) {
      return null;
    }

    return Tensor.fromProduct(product);
  }

}
