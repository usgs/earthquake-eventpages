import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pending'
})
export class PendingPipe implements PipeTransform {
  /**
   * Checks to see if landslides and liquifaction are in a pending state.
   * @param product
   *    Ground failure product
   *
   * @return boolean
   *    True = None in pending state
   *    False = One is in a pending state.
   */
  transform(product: any): any {
    if (!product || !product.properties) {
      return null;
    }

    let pending = false;

    try {
      pending =
        product.properties['landslide-alert'].toLowerCase() !== 'pending' &&
        product.properties['liquefaction-alert'].toLowerCase() !== 'pending';
    } catch (e) {
      pending = false;
    }

    return pending;
  }
}
