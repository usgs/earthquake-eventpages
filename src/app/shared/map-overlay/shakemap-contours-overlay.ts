import { AsynchronousGeoJSONOverlay } from './asynchronous-geojson-overlay';

import * as L from 'leaflet';

/**
 * Shakemap contours overlay for leaflet map
 */
const ShakemapContoursOverlay = AsynchronousGeoJSONOverlay.extend({
  id: 'shakemap-contour',
  title: 'Shakemap Contour',
  legend: null,
  _count: 0,

  /**
   * Build leaflet overlay
   *
   * @param product
   *     The product from this event
   */
  initialize: function(product: any) {
    AsynchronousGeoJSONOverlay.prototype.initialize.call(this);
  },

  /**
   * Adds map bounds to overlay
   */
  afterAdd: function() {
    this.bounds = this.getBounds();
    this.map.fitBounds(this.bounds);
  },

  /**
   * Generates label content that will be displayed inline with the contour
   *
   * @param feature
   *     The feature from the product
   */
  createLabel: function(feature: any) {
    // Overwrite in subclass
    return '';
  },

  /**
   * Generates angle for countour overlay
   *
   * @param point1
   *     X point to generate angle
   * @param point2
   *     Y point to generate angle
   */
  getAngle: function(point1: any, point2: any) {
    const slope = (point2[1] - point1[1]) / (point2[0] - point1[0]);

    let angle = Math.round((Math.atan(slope) / Math.PI) * 180);
    if (angle > 50 || angle < -50) {
      angle = 0;
    }

    return angle;
  },

  /**
   * Generates a marker for the contours overlay and adds the layer
   *
   * @param feature
   *     The feature from the product
   * @param layer {optional}
   *     The layer to append to
   */
  onEachFeature: function(feature: any, layer: any) {
    if (feature.properties && this._count % 2 === 0) {
      const coordinates = feature.geometry.coordinates[0];
      const coordinateIdx = Math.round(
        Math.random() * (coordinates.length - 2)
      );

      // get angle for the labels
      const markerCoords = coordinates[coordinateIdx];
      const nextCoords = coordinates[coordinateIdx + 1];
      const angle = this.getAngle(markerCoords, nextCoords) * -1;

      const marker = L.marker([markerCoords[1], markerCoords[0]], {
        icon: L.divIcon({
          className: 'contour-overlay-label',
          html: `<div
              class="content">
                <div
                style="transform: rotate(${angle}deg)">
                  ${this.createLabel(feature)}
                </div>
              </div>`,
          iconSize: [14, 10],
          iconAnchor: [7, 8]
        })
      });

      this.addLayer(marker);
    }

    this._count += 1;
  },

  /**
   * Sets line style for the overlay
   *
   * @param feature
   *     The feature from this product
   */
  style: function(feature: any) {
    // set default line style
    // weight oscillates
    const lineStyle = {
      color: '#fff',
      opacity: 1,
      weight: 4 - (this._count % 2) * 2
    };

    return lineStyle;
  }
});

export { ShakemapContoursOverlay };
