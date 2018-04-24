import { Pipe, PipeTransform } from '@angular/core';

import { GroundFailureLiquefactionOverlay } from './map-overlay/ground-failure-liquefaction-overlay';
import { GroundFailureLandslideOverlay } from './map-overlay/ground-failure-landslide-overlay';

import * as L from 'leaflet';

@Pipe({
  name: 'groundFailureOverlays'
})
export class GroundFailureOverlaysPipe implements PipeTransform {

  constructor () {}

  transform (product: any): Array<L.Layer> {
    const overlays = [];
    if (product) {
      overlays.push(new GroundFailureLiquefactionOverlay(product));
      overlays.push(new GroundFailureLandslideOverlay(product));
    }

    return overlays;
  }

}
