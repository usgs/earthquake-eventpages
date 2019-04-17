import * as L from 'leaflet';

import { AsynchronousGeoJSONOverlay } from './asynchronous-geojson-overlay';
import { EpicenterOverlay } from './epicenter-overlay';

/**
 * Shakemaop intensity overlay for leaflet map
 */
// tslint:disable-next-line:variable-name
const ShakeAlertOverlay = AsynchronousGeoJSONOverlay.extend({
  bounds: null,
  // retain layer data to detect whether it's already loaded
  data: null,
  id: 'shakealert',
  legends: [],
  title: 'ShakeAlert',

  /**
   * Build leaflet overlay
   *
   * @param product
   *     shakemap product
   */
  initialize: function(product: any) {
    AsynchronousGeoJSONOverlay.prototype.initialize.call(this);
    // check if geojson data or product is passed
    if (product.features) {
      this.data = product;
      // add data to layer (and map if layer still visible)
      this.addData(this.data);
    }
    // TODO, once they send a legend
    // const legend = document.createElement('img');
    // legend.src = './assets/shakealert-legend.png';
    // legend.setAttribute('alt', 'ShakeAlert legend');
    // this.legends.push(legend);
  },

  afterAdd: function() {
    this.bounds = this.getBounds();
    this.map.fitBounds(this.bounds);
  },

  /**
   * Handle custom circle fetaures
   *
   * @param feature
   * @param layer
   */
  pointToLayer: function(feature, latlng) {
    if (!feature || !feature.properties) {
      return;
    }

    const properties = feature.properties;
    if (properties.radius) {
      // create a circle, with radius = properties.radius
      return L.circle(latlng, properties);
    } else if (
      properties.icon &&
      properties.icon.toUpperCase() === 'EPICENTER'
    ) {
      // create an epicenter marker
      return new EpicenterOverlay({
        properties: {
          latitude: latlng.lat,
          longitude: latlng.lng
        }
      });
    } else {
      // display an orange circle marker
      const defaultOptions = {
        color: '#000',
        fillColor: '#ff7800',
        fillOpacity: 0.8,
        opacity: 1,
        radius: 8,
        weight: 1
      };
      return L.circleMarker(latlng, defaultOptions);
    }
  }
});

export { ShakeAlertOverlay };
