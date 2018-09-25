import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sharedStatus'
})
export class StatusPipe implements PipeTransform {
  /**
   * Gets the UPPERCASE result of the given product's status. If no product
   * is given or the status is not set, the empty string is returned.
   *
   * @param product
   *      The product to get the status of.
   */
  transform(product: any): string {
    try {
      return product.status.toUpperCase();
    } catch (e) {
      return '';
    }
  }
}
