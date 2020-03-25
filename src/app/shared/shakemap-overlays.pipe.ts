import { Pipe, PipeTransform } from '@angular/core';

import * as L from 'leaflet';

import { EpicenterOverlay } from './map-overlay/epicenter-overlay';
import { ShakemapIntensityOverlay } from './map-overlay/shakemap-intensity-overlay';
import { ShakemapMmiOverlay } from './map-overlay/shakemap-mmi-overlay';
import { ShakemapPGAOverlay } from './map-overlay/shakemap-pga-overlay';
import { ShakemapPGVOverlay } from './map-overlay/shakemap-pgv-overlay';
import { ShakemapPSA03Overlay } from './map-overlay/shakemap-psa03-overlay';
import { ShakemapPSA10Overlay } from './map-overlay/shakemap-psa10-overlay';
import { ShakemapPSA30Overlay } from './map-overlay/shakemap-psa30-overlay';
import { ShakemapStationsOverlay } from './map-overlay/shakemap-stations-overlay';
import { ShakemapMmiCoverageOverlay } from './map-overlay/shakemap-mmi-coverage-overlay';

@Pipe({
  name: 'shakemapOverlays'
})
export class ShakemapOverlaysPipe implements PipeTransform {
  /**
   * Get all shakemap overlays
   *
   * @param product
   *     Shakemap product
   * @param enabled
   *     Whether or not to enable the layers
   *
   * @returns {Array<L.Layer>}
   *     shakemap overlay
   */
  transform(product: any, enabled: string[] = []): Array<L.Layer> {
    let overlays = [];

    if (product) {
      overlays.push(new ShakemapIntensityOverlay(product));
      overlays.push(new ShakemapMmiOverlay(product));
      overlays.push(new ShakemapPGAOverlay(product));
      overlays.push(new ShakemapPGVOverlay(product));
      overlays.push(new ShakemapPSA03Overlay(product));
      overlays.push(new ShakemapPSA10Overlay(product));
      overlays.push(new ShakemapPSA30Overlay(product));
      overlays.push(new ShakemapStationsOverlay(product));
      overlays.push(new ShakemapMmiCoverageOverlay(product));

      overlays.forEach(overlay => {
        overlay.enabled = enabled.indexOf(overlay.id) > -1;
      });

      // filter overlays with missing products
      overlays = overlays.filter(overlay => overlay.url !== null);

      overlays.push(new EpicenterOverlay(product));
    }

    return overlays;
  }
}
