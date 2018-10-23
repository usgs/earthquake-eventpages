import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pending'
})
export class PendingPipe implements PipeTransform {
  /**
   * Checks to see if landslides and liquifaction are both in a pending state.
   * @param product
   *    Ground failure product
   *
   * @return boolean
   *
   */
  transform(product: any): any {
    if (!product || !product.properties) {
      return null;
    }

    if (
      product.properties['landslide-alert'].toLowerCase() !== 'pending' &&
      product.properties['liquefaction-alert'].toLowerCase() !== 'pending'
    ) {
      return true;
    } else {
      return false;
    }
  }
}
