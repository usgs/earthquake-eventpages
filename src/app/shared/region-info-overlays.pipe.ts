import { Pipe, PipeTransform } from '@angular/core';

import * as L from 'leaflet';

import { EpicenterOverlay } from './map-overlay/epicenter-overlay';
import {
  HistoricSeismicityOverlay
} from './map-overlay/historic-seismicity-overlay';


@Pipe({
  name: 'regionInfoOverlays'
})
export class RegionInfoOverlaysPipe implements PipeTransform {


  /**
   * Returns regional info leaflet overlays for the map
   * @param product
   *     The event product
   * @returns {Array<L.Layer>}
   */
  transform (product: any): Array<L.Layer> | null {
    const overlays = [];

    if (product) {
      overlays.push(new EpicenterOverlay(product));
    }
    overlays.push(new HistoricSeismicityOverlay());

    return overlays;
  }

}
