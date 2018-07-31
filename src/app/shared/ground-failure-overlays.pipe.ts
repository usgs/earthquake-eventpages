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
   * @returns {Array<L.Layer>}
   */
  transform (product: any): Array<L.Layer> {
    const overlays = [];
    if (product) {
      overlays.push(new GroundFailureLiquefactionOverlay(product));
      overlays.push(new GroundFailureLandslideOverlay(product));
    }
    return overlays;
  }

}
