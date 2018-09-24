import { DyfiResponseOverlay } from '@shared/map-overlay/dyfi-response-overlay';
import { Pipe, PipeTransform } from '@angular/core';

import * as L from 'leaflet';

@Pipe({
  name: 'dyfiOverlays'
})
export class DyfiOverlaysPipe implements PipeTransform {
  /**
   * This pipe creates new instances of DyfiResponseOverlay classes
   * which take a number as an argument, for either 1km or 10km geojson files
   *
   * @param product
   *      The product from the current event, in this case dyfi
   * @returns overlays
   *      An array of overlay class instances
   */
  transform(product: any): Array<L.Layer> {
    const overlays = [];
    if (product.contents['dyfi_geo_1km.geojson']) {
      overlays.push(new DyfiResponseOverlay(product, 1));
    }
    if (product.contents['dyfi_geo_10km.geojson']) {
      overlays.push(new DyfiResponseOverlay(product, 10));
    }

    return overlays;
  }
}
