import { Pipe, PipeTransform } from '@angular/core';

import { Tensor } from './beachball/tensor';

/**
 * Returns tensor from the product object
 */
@Pipe({
  name: 'sharedTensor'
})
export class TensorPipe implements PipeTransform {


  transform (product: any): any {
    return Tensor.fromProduct(product);
  }

}
