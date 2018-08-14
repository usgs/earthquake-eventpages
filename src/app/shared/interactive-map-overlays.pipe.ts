import { Pipe, PipeTransform } from '@angular/core';
import { ParamMap } from '@angular/router';

import * as L from 'leaflet';

import { Event } from '../event';
import { GroundFailureOverlaysPipe } from '@shared/ground-failure-overlays.pipe';
import { RegionInfoOverlaysPipe } from '@shared/region-info-overlays.pipe';
import { ShakemapOverlaysPipe } from '@shared/shakemap-overlays.pipe';
import { getUnique } from '../unique';
import { LandscanPopulationOverlay } from './map-overlay/landscan-population-overlay';

@Pipe({
  name: 'interactiveMapOverlays'
})
export class InteractiveMapOverlaysPipe implements PipeTransform {
  public defaultOverlays: any = {
    epicenter: true,
    'shakemap-intensity': true
  };
  public staticOverlays: L.Layer[] = [new LandscanPopulationOverlay()];
  // pipes related to their product
  public overlayFactory: any = {
    origin: new RegionInfoOverlaysPipe(),
    // keep origin first, the rest go here:
    shakemap: new ShakemapOverlaysPipe(),
    'ground-failure': new GroundFailureOverlaysPipe()
  };
  // track which event was last displayed
  public lastEvent: Event = null;
  public overlayCache: any = {};

  /**
   * Add overlays to the map
   *
   * @param event
   *    Earthquake event to generate layers for
   * @param params Optional
   *    Can turn on specific layers with {layerid: 'true'}
   *
   * @return {any}
   *    Array of overlays added to the map
   */
  transform(event: Event, params: ParamMap = null): any {
    if (this.lastEvent !== event) {
      this.lastEvent = event;
      this.overlayCache = {};
    }

    if (!event) {
      return [];
    }

    // new array every time for change detection
    let overlays = [];
    Object.keys(this.overlayFactory).forEach(type => {
      overlays.push(...this.getOverlays(event, params, type));
    });

    overlays.push(...this.staticOverlays);
    // allow layers to reuse overlays
    overlays = getUnique(overlays);

    this.setEnabled(overlays, params);

    return overlays;
  }

  /**
   * Returns overlays for a specfic product type
   *
   * @param event
   *     The event
   * @param params
   *     Query string parameters
   * @param type
   *     Type of product
   *
   * @return {Array<L.Layer>}
   */
  getOverlays(event: Event, params: ParamMap, type: string): Array<L.Layer> {
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

  /**
   * Get product based on source, code, type
   *
   * @param event
   *     The event
   * @param params
   *     Query string parameters
   * @param type
   *     The type of product
   *
   * @return {any}
   *     matching product
   */
  getProduct(event: Event, params: ParamMap, type: string): any {
    // get product
    let code, source;
    if (params) {
      code = params.get(type + '-code');
      source = params.get(type + '-source');
    }
    return event.getProduct(type, source, code);
  }

  /**
   * Updates the visible overlays on the map based on
   * the query string parameters
   *
   * @param overlays
   *     Map overlays
   * @param params
   *     Query string parameters
   */
  setEnabled(overlays: Array<L.Layer>, params: ParamMap) {
    overlays.forEach(overlay => {
      const enabledParam = params ? params.get(overlay.id) : false;
      if (enabledParam) {
        // this is a string, so even 'false' is true...
        overlay.enabled = enabledParam === 'true';
      } else {
        overlay.enabled = this.defaultOverlays[overlay.id];
      }
    });
  }
}
