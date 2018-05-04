import * as L from 'leaflet';

import { AsynchronousGeoJSONOverlay } from './asynchronous-geojson-overlay';


const ShakemapIntensityOverlay = AsynchronousGeoJSONOverlay.extend({

  id: 'shakemap-intensity',
  title: 'Shakemap MMI Contours',
  legend: null,

  initialize: function (product) {
    AsynchronousGeoJSONOverlay.prototype.initialize.call(this);

    const legend = document.createElement('img');
    legend.src = './assets/shakemap-intensity-legend-small.png';
    legend.setAttribute('alt', 'Intensity scale legend');
    this.legend = legend;

    this.url = this.getUrl(product);
  },

  getUrl: function (product) {
    if (product == null) {
      return null;
    }

    return product.contents['download/cont_mi.json'] ?
         product.contents['download/cont_mi.json'].url : null;
  },

  onEachFeature: function (feature, layer) {
    if (feature.properties) {
      layer.bindPopup(`<abbr title="Modified Mercalli Intensity">MMI</abbr> ${feature.properties.value}`);
    }
  },

  style: function (feature) {
    // set default line style
    const lineStyle = {
      'color': feature.properties.color,
      'weight': feature.properties.weight,
      'opacity': 1
    };

    return lineStyle;
  }

});


export { ShakemapIntensityOverlay };
