import { Pipe, PipeTransform } from '@angular/core';
import { HistoricSeismicityOverlay } from './map-overlay/historic-seismicity-overlay';
import { EpicenterOverlay } from './map-overlay/epicenter-overlay';

import * as L from 'leaflet';


@Pipe({
  name: 'regionInfoOverlays'
})
export class RegionInfoOverlaysPipe implements PipeTransform {

  transform(product: any): Array<L.Layer> {
    const overlays = [];

    if (product) {
      overlays.push(new EpicenterOverlay(product));
    }
    overlays.push(new HistoricSeismicityOverlay());

    return overlays;
  }

}
