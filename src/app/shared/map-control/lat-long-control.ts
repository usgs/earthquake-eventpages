import * as L from 'leaflet';

import { MapComponent } from './../map/map.component';
import { MobileCheckPipe } from './../mobile-check.pipe';
import { WindowRef } from './../window-ref-wrapper';

/**
 * leaflet lat/long control box
 */
// tslint:disable-next-line:variable-name
const LatLongControl = L.Control.extend({
  /**
   * Generates template for the lat/long container
   *
   * @param map
   *      The map overlay
   *
   * @returns any
   */
  onAdd: function(map) {
    // const className = 'leaflet-control-latlong';
    const pipe = new MobileCheckPipe(new WindowRef());

    this._map = map;

    if (!pipe.transform()) {
      if (!this._container) {
        // this._container = L.DomUtil.create('div', className);
        // this._container.innerHTML = '<h1>Test</h1>';

        // this._container.setAttribute('aria-haspopup', false);

        // return this._container;
        const img = L.DomUtil.create('img');
        img.src = '../../assets/legend-landscan-population.png';
        img.style.width = '200px';
        return img;
      }
    }
    return '<p></p>';
  },

  onRemove: function(map) {}
});

export { LatLongControl };
