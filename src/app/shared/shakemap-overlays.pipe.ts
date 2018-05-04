import { Pipe, PipeTransform } from '@angular/core';

import { EpicenterOverlay } from './map-overlay/epicenter-overlay';
import { ShakemapIntensityOverlay } from './map-overlay/shakemap-intensity-overlay';
import { ShakemapPGAOverlay } from './map-overlay/shakemap-pga-overlay';
import { ShakemapPGVOverlay } from './map-overlay/shakemap-pgv-overlay';
import { ShakemapPSA03Overlay } from './map-overlay/shakemap-psa03-overlay';
import { ShakemapPSA10Overlay } from './map-overlay/shakemap-psa10-overlay';
import { ShakemapPSA30Overlay } from './map-overlay/shakemap-psa30-overlay';

import * as L from 'leaflet';


@Pipe({
  name: 'shakemapOverlays'
})
export class ShakemapOverlaysPipe implements PipeTransform {

  transform (product: any, enabled: string = null): Array<L.Layer> {
    let overlays = [];

    if (product) {
      overlays.push(new ShakemapIntensityOverlay(product));
      overlays.push(new ShakemapPGAOverlay(product));
      overlays.push(new ShakemapPGVOverlay(product));
      overlays.push(new ShakemapPSA03Overlay(product));
      overlays.push(new ShakemapPSA10Overlay(product));
      overlays.push(new ShakemapPSA30Overlay(product));

      overlays.forEach((overlay) => {
        overlay.enabled = overlay.id === enabled;
      });

      // filter overlays with missing products
      overlays = overlays.filter(overlay => overlay.url !== null);

      overlays.push(new EpicenterOverlay(product));
    }

    return overlays;
  }

}

