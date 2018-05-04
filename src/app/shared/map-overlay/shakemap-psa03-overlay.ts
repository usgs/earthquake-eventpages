import * as L from 'leaflet';

import { AsynchronousGeoJSONOverlay } from './asynchronous-geojson-overlay';


const ShakemapPSA03Overlay = AsynchronousGeoJSONOverlay.extend({

  id: 'shakemap-psa03',
  title: 'Shakemap PSA03 Contours',
  legend: null,

  initialize: function (product) {
    AsynchronousGeoJSONOverlay.prototype.initialize.call(this);

    this.url = this.getUrl(product);
  },

  getUrl: function (product) {
    if (product == null) {
      return null;
    }

    return product.contents['download/cont_psa03.json'] ?
         product.contents['download/cont_psa03.json'].url : null;
  },

  onEachFeature: function (feature, layer) {
    if (feature.properties) {
      layer.bindPopup(`${feature.properties.value} %g`);
    }
  },

  style: function (feature) {
    // set default line style
    const lineStyle = {
      'color': '#fff',
      'opacity': 1
    };

    return lineStyle;
  }

});

export { ShakemapPSA03Overlay };
