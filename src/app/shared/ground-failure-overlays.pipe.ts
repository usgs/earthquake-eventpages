import { Pipe, PipeTransform } from '@angular/core';

import { Overlay } from './map-overlay/overlay';
import { LiquefactionOverlay } from './map-overlay/liquefaction-overlay';
import { LandslideOverlay } from './map-overlay/landslide-overlay';

@Pipe({
  name: 'groundFailureOverlays'
})
export class GroundFailureOverlaysPipe implements PipeTransform {

  constructor () {}

  transform (product: any): Array<Overlay> {
    const overlays = [];
    if (product) {
      overlays.push(new LiquefactionOverlay(product));
      overlays.push(new LandslideOverlay(product));
    }

    return overlays;
  }

}
