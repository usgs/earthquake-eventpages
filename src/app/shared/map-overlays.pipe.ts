import { ParamMap } from '@angular/router';
import { Pipe, PipeTransform } from '@angular/core';

import { Event } from '../event';
import { LandscanPopulationOverlay } from './map-overlay/landscan-population-overlay';
import { Overlay } from '../shared/map-overlay/overlay';
import { getUnique } from '../unique';


@Pipe({
  name: 'mapOverlays'
})
export class MapOverlaysPipe implements PipeTransform {

  constructor() {}

  // set default overlays that will appear on the map
  public defaultOverlays: any;

  // track which event was last displayed
  public lastEvent: Event = null;

  // cache overlays
  public overlayCache: any = {
/*
    'origin': {
      product: product,
      layers: []
    }
*/
  };

  // pipes related to their product
  public overlayFactory: OverlayFactory[] = [
/*
    {type: 'origin', pipe: new RegionInfoOverlaysPipe()},
    {type: 'shakemap', pipe: new ShakemapOverlaysPipe()}
*/
  ];

  transform(event: Event, params: ParamMap): any {
    if (this.lastEvent !== event) {
      this.lastEvent = event;
      this.overlayCache = {};
    }

    if (!event) {
      return [];
    }

    // new array every time for change detection
    let overlays = [];
    this.overlayFactory.forEach((factory) => {
      overlays.push(...this.getOverlays(event, params, factory));
    });

    overlays.push(new LandscanPopulationOverlay());
    // allow layers to reuse overlays
    overlays = getUnique(overlays);

    this.setEnabled(overlays, params);

    return overlays;
  }

  getOverlays (event: Event, params: ParamMap, factory: any): Array<Overlay> {
    const product = this.getProduct(event, params, factory.type);

    // get/cache overlays for product
    const cache = this.overlayCache[factory.type] || {};
    if (cache.product !== product) {
      cache.product = product;
      cache.overlays = factory.pipe.transform(product);
      this.overlayCache[factory.type] = cache;
    }

    return cache.overlays;
  }

  getProduct (event: Event, params: ParamMap, type: string): any {
    // get product
    let code,
        source;
    if (params) {
      code = params.get(type + '-code');
      source = params.get(type + '-source');
    }
    return event.getProduct(type, source, code);
  }

  setEnabled (overlays: Array<Overlay>, params: ParamMap) {
    overlays.forEach((overlay) => {
      const enabledParam = params ? params.get(overlay.id) : false;
      if (enabledParam) { // this is a string, so even 'false' is true...
        overlay.enabled = (enabledParam === 'true');
      } else {
        overlay.enabled = this.defaultOverlays[overlay.id];
      }
    });
  }

}

export interface OverlayFactory {
    type: string;
    pipe: any;
}
