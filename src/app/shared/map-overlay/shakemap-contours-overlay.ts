import * as L from 'leaflet';

import { AsynchronousGeoJSONOverlay } from './asynchronous-geojson-overlay';


const ShakemapContoursOverlay = AsynchronousGeoJSONOverlay.extend({

  id: 'shakemap-contour',
  title: 'Shakemap Contour',
  legend: null,
  _count: 0,

  initialize: function (product) {
    AsynchronousGeoJSONOverlay.prototype.initialize.call(this);

    this.url = this.getUrl(product);
  },

  afterAdd: function () {
    this.bounds = this.getBounds();
    this.map.fitBounds(this.bounds);
  },

  getUrl: function (product) {
    // override in subclass
    return '';
  },

  onEachFeature: function (feature, layer) {
    if (feature.properties && (this._count % 2 === 0)) {
      const coordinates = feature.geometry.coordinates[0];
      const coordinateIdx = Math.round(Math.random() * (coordinates.length - 2));

      // get angle for the labels
      const markerCoords = coordinates[coordinateIdx];
      const nextCoords = coordinates[coordinateIdx + 1];

      const slope = ((markerCoords[1] - nextCoords[1]) /
          (markerCoords[0] - nextCoords[0]));

      let angle = Math.round(Math.atan(slope) / Math.PI * 180) * -1;
      if ((angle > 50) || angle < -50) {
        angle = 0;
      }

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

  createLabel: function (feature) {
    // Overwrite in subclass
    return '';
  },

  style: function (feature) {
    // set default line style
    // weight oscillates
    const lineStyle = {
      'color': '#fff',
      'opacity': 1,
      'weight': 4 - (this._count % 2) * 2
    };

    return lineStyle;
  }

});

export { ShakemapContoursOverlay };
