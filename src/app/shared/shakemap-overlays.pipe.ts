import { Pipe, PipeTransform } from '@angular/core';

import { EpicenterOverlay } from './map-overlay/epicenter-overlay';
import { ShakemapIntensityOverlay } from './map-overlay/shakemap-intensity-overlay';

import * as L from 'leaflet';


@Pipe({
  name: 'shakemapOverlays'
})
export class ShakemapOverlaysPipe implements PipeTransform {

  transform (product: any, enabled: string = null): Array<L.Layer> {
    const overlays = [];
    if (product) {
      overlays.push(new ShakemapIntensityOverlay(product));

      overlays.forEach((overlay) => {
        overlay.enabled = overlay.id === enabled;
      });

      overlays.push(new EpicenterOverlay(product));
    }

    return overlays;
  }

}

