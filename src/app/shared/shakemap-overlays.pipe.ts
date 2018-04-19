import { Pipe, PipeTransform } from '@angular/core';

import { EpicenterOverlay } from './map-overlay/epicenter-overlay';
import { Overlay } from './map-overlay/overlay';
import { ShakemapIntensityOverlay } from './map-overlay/shakemap-intensity-overlay';

@Pipe({
  name: 'shakemapOverlays'
})
export class ShakemapOverlaysPipe implements PipeTransform {

  transform (product: any, enabled: string = null): Array<Overlay> {
    const overlays = [];
    if (product) {
      overlays.push(new ShakemapIntensityOverlay(product));

      if (enabled) {
        overlays.forEach((overlay) => {
          overlay.enabled = overlay.id === enabled;
        });
      }

      overlays.push(new EpicenterOverlay(product));
    }

    return overlays;
  }

}

