import { AsynchronousGeoJSONOverlay } from './asynchronous-geojson-overlay';

import * as L from 'leaflet';

/**
 * Shakemap contours overlay for leaflet map
 */
// tslint:disable-next-line:variable-name
const ShakemapContoursOverlay = AsynchronousGeoJSONOverlay.extend({
  _count: 0,
  id: 'shakemap-contour',
  legends: [],
  title: 'Shakemap Contour',

  /**
   * Build leaflet overlay
   *
   * @param product
   *     The product from this event
   */
  initialize: function(product: any) {
    AsynchronousGeoJSONOverlay.prototype.initialize.call(this);

    const contourLegend = document.createElement('img');
    contourLegend.src = './assets/legend-intensity-contour.png';
    contourLegend.setAttribute('alt', 'Intensity Contour Legend');

    const intensityLegend = document.createElement('img');
    intensityLegend.src = './assets/shakemap-intensity-legend-small.png';
    intensityLegend.setAttribute('alt', 'Intensity Scale legend');

    // Add to legends array
    this.legends.push(intensityLegend, contourLegend);
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
   * Generates popup content for an individual feature
   *
   * @param feature
   *     The feature from the product
   */
  getPopupContent: function(feature: any) {
    return this.createLabel(feature);
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
          iconAnchor: [7, 8],
          iconSize: [14, 10]
        })
      });

      this.addLayer(marker);
    }

    this._count += 1;

    const popupContent = this.getPopupContent(feature);
    layer.bindPopup(popupContent);
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
    const color = feature.properties.color ? feature.properties.color : '#fff';
    const weight = feature.properties.weight ?
        feature.properties.weight :  4 - (this._count % 2) * 2;

    const lineStyle = {
      color: color,
      opacity: 1,
      weight: weight
    };

    return lineStyle;
  }
});

export { ShakemapContoursOverlay };
