import { Pipe, PipeTransform } from '@angular/core';
import { ParamMap } from '@angular/router';
import { Event } from '../event';
import { RegionInfoOverlaysPipe } from '../shared/region-info-overlays.pipe';
import { Overlay } from '../shared/map-overlay/overlay';

@Pipe({
  name: 'interactiveMapOverlays'
})
export class InteractiveMapOverlaysPipe implements PipeTransform {

  public defaultOverlays = {
    epicenter: true
  };

  public lastEvent: Event = null;

  public overlayCache: any = {
/*
    'origin': {
      product: product,
      layers: []
    }
*/
  };

  public overlayFactory: any = {
    'origin': new RegionInfoOverlaysPipe()
  };

  transform(event: Event, params: ParamMap): any {
    if (this.lastEvent !== event) {
      this.lastEvent = event;
      this.overlayCache = {};
    }

    if (!event) {
      return [];
    }

    // new array every time for change detection
    const overlays = [];
    Object.keys(this.overlayFactory).forEach((type) => {
      overlays.push(...this.getOverlays(event, params, type));
    });

    this.setEnabled(overlays, params);

    return overlays;
  }

  getOverlays (event: Event, params: ParamMap, type: string): Array<Overlay> {
    const product = this.getProduct(event, params, type);

    // get/cache overlays for product
    const cache = this.overlayCache[type] || {};
    if (cache.product !== product) {
      cache.product = product;
      cache.overlays = this.overlayFactory[type].transform(product);
      this.overlayCache[type] = cache;
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
    if (!params) {
      return;
    }

    overlays.forEach((overlay) => {
      const enabledParam = params.get(overlay.id);
      if (enabledParam) { // this is a string, so even 'false' is true...
        overlay.enabled = (enabledParam === 'true');
      } else {
        overlay.enabled = !!this.defaultOverlays[overlay.id];
      }
    });
  }

}
