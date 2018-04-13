import { ParamMap } from '@angular/router';
import { Pipe, PipeTransform } from '@angular/core';

import { Event } from '../event';
import { LandscanPopulationOverlay } from './map-overlay/landscan-population-overlay';
import { MapOverlaysPipe, OverlayFactory } from './map-overlays.pipe';
import { Overlay } from '../shared/map-overlay/overlay';
import { RegionInfoOverlaysPipe } from '../shared/region-info-overlays.pipe';
import { ShakemapOverlaysPipe } from '../shared/shakemap-overlays.pipe';
import { getUnique } from '../unique';


@Pipe({
  name: 'interactiveMapOverlays'
})
export class InteractiveMapOverlaysPipe extends MapOverlaysPipe {

  public defaultOverlays = {
    epicenter: true,
    'shakemap-intensity': true
  };

  // pipes related to their product
  public overlayFactory: OverlayFactory[] = [
    {type: 'origin', pipe: new RegionInfoOverlaysPipe()},
    {type: 'shakemap', pipe: new ShakemapOverlaysPipe()}
  ];

}
