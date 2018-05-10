import * as L from 'leaflet';

import { ShakemapContoursOverlay } from './shakemap-contours-overlay';


const ShakemapPSA10Overlay = ShakemapContoursOverlay.extend({

  id: 'shakemap-psa10',
  title: 'Shakemap PSA10 Contours',
  legend: null,

  initialize: function (product) {
    ShakemapContoursOverlay.prototype.initialize.call(this);

    this.url = this.getUrl(product);
  },

  getUrl: function (product) {
    if (product == null) {
      return null;
    }

    return product.contents['download/cont_psa10.json'] ?
         product.contents['download/cont_psa10.json'].url : null;
  },

  createLabel: function (feature) {
    return `${feature.properties.value} %g`;
  }

});

export { ShakemapPSA10Overlay };
