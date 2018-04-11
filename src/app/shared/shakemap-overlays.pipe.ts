import { HttpClient } from '@angular/common/http';
import { Pipe, PipeTransform } from '@angular/core';

import { IntensityOverlay } from './map-overlay/intensity-overlay';
import { EpicenterOverlay } from './map-overlay/epicenter-overlay';
import { Overlay } from './map-overlay/overlay';

@Pipe({
  name: 'shakemapOverlays'
})
export class ShakemapOverlaysPipe implements PipeTransform {

  constructor (private httpClient: HttpClient) {}

  transform (product: any): Array<Overlay> {

    const overlays = [];
    if (product) {
      overlays.push(new IntensityOverlay(product, this.httpClient));
      overlays.push(new EpicenterOverlay(product));
    }

    return overlays;
  }

}

