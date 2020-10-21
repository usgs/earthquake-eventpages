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
   * @param zoom
   *      boolean describes wether to zoom in on the map or not. Used
   *      in the shakemap intensity maps
   *
   * @return
   *     map bounds
   */
  transform(product: any, zoom = false): Array<any> {
    if (!product || !product.properties) {
      return null;
    }

    let minLat = parseFloat(product.properties['minimum-latitude']);
    let maxLat = parseFloat(product.properties['maximum-latitude']);
    let minLon = parseFloat(product.properties['minimum-longitude']);
    const maxLon = parseFloat(product.properties['maximum-longitude']);

    // sure sure values are valid numbers
    if (isNaN(minLat) || isNaN(minLon) || isNaN(maxLat) || isNaN(maxLon)) {
      return null;
    }

    if (maxLon < minLon && (minLon - maxLon) > 180) {
      // likely spanning date line, shift longitude left
      minLon -= 360;
    }

    if (zoom) {
      // Adjust for shrinking latitudes at high latitudes
      const absMaxLat = Math.max(Math.abs(maxLat), Math.abs(minLat));
      const latFactor = absMaxLat > 75 ? .1 :
          absMaxLat > 70 ? .05 :
          absMaxLat > 65 ? .01 :
          absMaxLat > 60 ? .001 :
          absMaxLat > 50 ? .0005 : 0;

      const latAdjust = absMaxLat * latFactor;
      minLat = minLat + latAdjust;
      maxLat = maxLat - latAdjust;
    }

    return [[minLat, minLon], [maxLat, maxLon]];
  }
}
