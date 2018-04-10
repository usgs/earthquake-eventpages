import { HttpClient, HttpHandler } from '@angular/common/http';
import { Pipe, PipeTransform } from '@angular/core';

import { AsyncMapLayerService } from '../core/async-map-layer.service';
import { IntensityOverlay } from './map-overlay/intensity-overlay';
import { Overlay } from './map-overlay/overlay';

@Pipe({
  name: 'shakemapOverlays'
})
export class ShakemapOverlaysPipe implements PipeTransform {

  constructor(private layerService: AsyncMapLayerService) {}

  transform(product: any): Array<Overlay> {
    const overlays = [];

    if (product) {
      const intensityUrl = product.contents['download/cont_mi.json'].url;
      this.layerService.generateLayer(IntensityOverlay, intensityUrl);
    }

    return overlays;
  }

}

