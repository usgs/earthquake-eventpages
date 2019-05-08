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
   * Add a leaflet tooltip to a circle feature.
   *
   * @param layer
   *    leaflet layer
   */
  addCircleTooltip: function(layer) {
    if (!layer || !layer.getBounds()) {
      return;
    }
    // get point from bottom of circle
    const bounds = layer.getBounds();
    const latlng = {
      lat: bounds._southWest.lat,
      lng: layer.feature.geometry.coordinates[0]
    };
    // create a marker for the tooltip
    const marker = this.createMarkerPlaceholder(latlng);
    // bind tooltip to the circle
    this.bindLayerTooltip(marker, layer.feature.properties.name);
  },

  /**
   * Add a leaflet tooltip to the first point in a polygon feature.
   * This is meant to separate the tooltips so that they are all visible
   * and will not overlap
   *
   * @param layer
   *    leaflet layer
   */
  addPolygonTooltip: function(layer) {
    if (!layer) {
      return;
    }
    // get first point on polygon
    const coordinates = layer.feature.geometry.coordinates;
    const latlng = {
      lat: coordinates[0][0][1],
      lng: coordinates[0][0][0]
    };
    // create a marker for the tooltip
    const marker = this.createMarkerPlaceholder(latlng);
    // bind tooltip to the circle
    this.bindLayerTooltip(marker, layer.feature.properties.name);
  },

  /**
   * Overrides AsynchronousGeoJSONOverlay.afterAdd(), called by L.Layer.onAdd()
   *
   * After the layers are added to the map bind tooltips.
   * This is done after the layers are added to the map because
   * we need to know the bounds of the circle features in order to bind
   * the tooltip to the edge of the circle.
   */
  afterAdd: function() {
    // keep the map from resetting to worldwide bounds
    this.bounds = this.getBounds();
    setTimeout(() => {
      this.map.fitBounds(this.bounds, {
        padding: [30, 30]
      });
    }, 0);

    // determine where to add the tooltip to each layer

    this.map.eachLayer(layer => {
      try {
        this.addTooltipToLayer(layer);
      } catch (e) {
        console.log(e);
      }
    });
  },

  /**
   * Based on the feature.type, determines where to add the tooltip
   * for each layer and binds the tooltip to the feature
   *
   * @param layer
   *    leaflet layer
   */
  addTooltipToLayer: function(layer) {
    // ensure that layer exists
    if (
      !layer ||
      !layer.feature ||
      !layer.feature.properties ||
      !layer.feature.properties.name ||
      !layer.feature.geometry
    ) {
      throw new Error('Leaflet feature is missing a tooltip or geometry');
    }

    // determine cirlce, polygon, or other
    if (
      layer.feature.geometry.type === 'Point' &&
      layer.feature.properties.radius
    ) {
      this.addCircleTooltip(layer);
    } else if (layer.feature.geometry.type === 'Polygon') {
      this.addPolygonTooltip(layer);
    } else {
      this.bindLayerTooltip(layer, layer.feature.properties.name);
    }
  },

  /**
   * Add a leaflet tooltip to the leaflet feature.
   *
   * @param layer
   *    leaflet layer
   */
  bindLayerTooltip: function(layer, text, options = {}) {
    layer.bindTooltip(
      text,
      Object.assign(
        {
          className: 'permanent-label',
          direction: 'top',
          permanent: true
        },
        options
      )
    );
  },

  /**
   * Creates an invisible marker that will act as a placeholder
   * for a tooltip on a polygon.
   *
   * @param latlng
   *    leaflet latlng pair
   */
  createMarkerPlaceholder: function(latlng) {
    // create invisible icon
    const icon = L.icon({
      iconSize: [0, 0],
      iconUrl: 'empty'
    });
    // add invisible marker to bottom center of circle
    return L.marker(latlng, { icon: icon }).addTo(this.map);
  },

  /**
   * Handle custom circle fetaures and custom markers
   *
   * @param feature
   *    GeoJSON feature
   * @param layer
   *    leaflet layer
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

  /**
   * Overrides style method on leaflet overlay
   *
   * @param feature
   */
  style: function(feature) {
    return this.translateGeojsonStyles(feature.properties);
  }
});

export { ShakeAlertOverlay };
