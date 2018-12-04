import { AsynchronousGeoJSONOverlay } from '@shared/map-overlay/asynchronous-geojson-overlay';

import * as L from 'leaflet';
/**
 * Shake-alert map overlay for leaflet map
 */
// tslint:disable-next-line:variable-name
const ShakeAlertMapOverlay = L.GeoJSON.extend({
  initialize: function(feature: any) {
    console.log('feature: ', feature);
    L.GeoJSON.prototype.initialize.call(this, [], {});
  }
});

export { ShakeAlertMapOverlay };
