import { Pipe, PipeTransform } from '@angular/core';

import { GroundFailureLandslideOverlay } from './map-overlay/ground-failure-landslide-overlay';
import { GroundFailureLiquefactionOverlay } from './map-overlay/ground-failure-liquefaction-overlay';

import * as L from 'leaflet';


/**
 * Returns ground failure leaflet overlays
 */
@Pipe({
  name: 'groundFailureOverlays'
})
export class GroundFailureOverlaysPipe implements PipeTransform {


  transform (product: any): Array<L.Layer> {
    const overlays = [];
    if (product) {
      overlays.push(new GroundFailureLiquefactionOverlay(product));
      overlays.push(new GroundFailureLandslideOverlay(product));
    }
    return overlays;
  }

}
