import { Pipe, PipeTransform } from '@angular/core';

import { LandscanPopulationOverlay } from './map-overlay/landscan-population-overlay';
import { MapOverlaysPipe, OverlayFactory } from './map-overlays.pipe';
import { RegionInfoOverlaysPipe } from '../shared/region-info-overlays.pipe';
import { ShakemapOverlaysPipe } from '../shared/shakemap-overlays.pipe';


@Pipe({
  name: 'interactiveMapOverlays'
})
export class InteractiveMapOverlaysPipe extends MapOverlaysPipe implements PipeTransform {

  public defaultOverlays = {
    epicenter: true,
    'shakemap-intensity': true
  };

  public staticOverlays = [new LandscanPopulationOverlay()];

  // pipes related to their product
  public overlayFactory: OverlayFactory[] = [
    {type: 'origin', pipe: new RegionInfoOverlaysPipe()},
    {type: 'shakemap', pipe: new ShakemapOverlaysPipe()}
  ];

}
