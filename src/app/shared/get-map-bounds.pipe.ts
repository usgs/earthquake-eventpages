import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sharedGetMapBounds'
})
export class GetMapBoundsPipe implements PipeTransform {
  /**
   * Get map bounds from product
   *
   * @param product
   *      product
   *
   * @return
   *     map bounds
   */
  transform(product: any): Array<any> {
    if (
      product &&
      product.properties &&
      product.properties['minimum-latitude'] &&
      product.properties['minimum-longitude'] &&
      product.properties['maximum-latitude'] &&
      product.properties['maximum-longitude']
    ) {
      return [
        [
          product.properties['minimum-latitude'],
          product.properties['minimum-longitude']
        ],
        [
          product.properties['maximum-latitude'],
          product.properties['maximum-longitude']
        ]
      ];
    }
    return null;
  }
}
