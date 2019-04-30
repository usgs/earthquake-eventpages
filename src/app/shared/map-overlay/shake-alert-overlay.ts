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

  /**
   * After the layers are added to the map bind tooltips.
   * This is done after the layers are added to the map because
   * we need to know the bounds of the circle features in order to bind
   * the tooltip to the edge of the circle.
   */
  afterAdd: function() {
    this.bounds = this.getBounds();
    setTimeout(() => {
      this.map.fitBounds(this.bounds);
    }, 0);

    // Check if layer is circle and add tooltip for warning times
    this.map.eachLayer(layer => {
      if (
        !layer ||
        !layer.feature ||
        !layer.feature.properties ||
        !layer.feature.properties.name ||
        !layer.feature.geometry
      ) {
        return;
      }

      if (
        layer.feature.geometry.type === 'Point' &&
        layer.feature.properties.radius
      ) {
        const bounds = layer.getBounds();
        const latlng = {
          lat: bounds._southWest.lat,
          lng: layer.feature.geometry.coordinates[0]
        };
        const icon = L.icon({
          iconSize: [0, 0],
          iconUrl: 'empty'
        });
        const marker = L.marker(latlng, { icon: icon }).addTo(this.map);
        // bind tooltip to the circle
        marker.bindTooltip(layer.feature.properties.name, {
          className: 'time-label',
          direction: 'top',
          permanent: true
        });
      } else {
        layer.bindTooltip(layer.feature.properties.name, {
          className: 'time-label',
          direction: 'top',
          permanent: true
        });
      }
    });
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
  },

  /**
   * Translate styles from GeoJSON CSS to Leaflet path options
   *
   * GeoJSON style types:
   * https://svgwg.org/svg2-draft/styling.html#InterfaceSVGStyleElement
   *
   * Leaflet path options:
   * https://leafletjs.com/reference-1.4.0.html#path-option
   *
   * @param geojsonProperties <string>
   *     style properties from the GeoJSON
   */
  translateGeojsonStyles: function(properties) {
    const mapping = {
      fill: 'fillColor',
      'fill-opacity': 'fillOpacity',
      stroke: 'color',
      'stroke-dasharray': 'dashArray',
      'stroke-dashoffset': 'dashOffset',
      'stroke-opacity': 'opacity',
      'stroke-width': 'weight'
    };
    const results = {};

    // no properties provided
    if (!properties) {
      return {};
    }

    for (const key of Object.keys(properties)) {
      // get leaflet style property
      const property = mapping[key];

      if (property) {
        // replace with leaflet style
        results[property] = properties[key];
      }
    }

    return results;
  },

  style: function(feature) {
    return this.translateGeojsonStyles(feature.properties);
  }
});

export { ShakeAlertOverlay };
