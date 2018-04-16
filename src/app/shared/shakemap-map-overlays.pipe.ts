import { Pipe, PipeTransform } from '@angular/core';

import { InteractiveMapOverlaysPipe } from './interactive-map-overlays.pipe';
import { ShakemapOverlaysPipe } from '../shared/shakemap-overlays.pipe';


@Pipe({
  name: 'shakemapMapOverlays'
})
export class ShakemapMapOverlaysPipe extends InteractiveMapOverlaysPipe implements PipeTransform {

  public defaultOverlays = {
    epicenter: true,
    'shakemap-intensity': true
  };

  // pipes related to their product
  public overlayFactory = {
    'shakemap': new ShakemapOverlaysPipe()
  };

}
