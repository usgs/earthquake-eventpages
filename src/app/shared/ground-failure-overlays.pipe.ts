import { Pipe, PipeTransform } from '@angular/core';

import * as L from 'leaflet';

import { GroundFailureLandslideOverlay } from './map-overlay/ground-failure-landslide-overlay';
import { GroundFailureLiquefactionOverlay } from './map-overlay/ground-failure-liquefaction-overlay';

@Pipe({
  name: 'groundFailureOverlays'
})
export class GroundFailureOverlaysPipe implements PipeTransform {
  /**
   * Returns an array of leaflet overlays for ground failure
   *
   * @param product
   *     a ground-failure product
   *
   * @return {Array<L.Layer>}
   *     an array of ground-failure overlays
   */
  transform(product: any): Array<L.Layer> {
    const overlays = [];
    if (product) {
      try {
        overlays.push(new GroundFailureLiquefactionOverlay(product));
      } catch (e) {}
      try {
        overlays.push(new GroundFailureLandslideOverlay(product));
      } catch (e) {}
    }
    return overlays;
  }
}
