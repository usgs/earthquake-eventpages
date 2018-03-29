import { Pipe, PipeTransform } from '@angular/core';
import { HistoricSeismicityOverlay } from './map-overlay/historic-seismicity-overlay';
import { Overlay } from './map-overlay/overlay';
import { EpicenterOverlay } from './map-overlay/epicenter-overlay';

@Pipe({
  name: 'regionInfoOverlay'
})
export class RegionInfoOverlaysPipe implements PipeTransform {

  transform(product: any): Array<Overlay> {
    const overlays = [];

    if (product) {
      overlays.push(new EpicenterOverlay(product));
    }
    overlays.push(new HistoricSeismicityOverlay());

    return overlays;
  }

}
