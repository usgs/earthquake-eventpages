import { FfMapOverlay } from '@shared/map-overlay/ff-map-overlay';
import { Pipe, PipeTransform } from '@angular/core';

import * as L from 'leaflet';

@Pipe({
  name: 'ffOverlays'
})
export class FfOverlaysPipe implements PipeTransform {
  /**
   * This pipe creates a new instance of FfMapOverlay classes which take
   * the product as an argument and use the FF.geojson file
   *
   * @param product
   *      The finite fault product
   * @returns overlays
   *      An array of overlay class instances
   *
   */
  transform(product: any): Array<L.Layer> {
    const overlays = [];
    if (product && product.contents && product.contents['FFM.geojson']) {
      overlays.push(new FfMapOverlay(product));
      return overlays;
    } else {
      return overlays;
    }
  }
}
