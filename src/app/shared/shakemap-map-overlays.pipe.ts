import { Pipe, PipeTransform } from '@angular/core';

import { MapOverlaysPipe, OverlayFactory } from './map-overlays.pipe';
import { ShakemapOverlaysPipe } from '../shared/shakemap-overlays.pipe';


@Pipe({
  name: 'shakemapMapOverlays'
})
export class ShakemapMapOverlaysPipe extends MapOverlaysPipe implements PipeTransform {

  public defaultOverlays = {
    epicenter: true,
    'shakemap-intensity': true
  };

  // pipes related to their product
  public overlayFactories: OverlayFactory[] = [
    {type: 'shakemap', pipe: new ShakemapOverlaysPipe()}
  ];

}
