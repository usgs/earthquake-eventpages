import * as L from 'leaflet';

import { ShakemapContoursOverlay } from './shakemap-contours-overlay';


const ShakemapPSA30Overlay = ShakemapContoursOverlay.extend({

  id: 'shakemap-psa30',
  title: 'Shakemap PSA30 Contours',
  legend: null,

  initialize: function (product) {
    ShakemapContoursOverlay.prototype.initialize.call(this);

    this.url = this.getUrl(product);
  },

  getUrl: function (product) {
    if (product == null) {
      return null;
    }

    return product.contents['download/cont_psa30.json'] ?
         product.contents['download/cont_psa30.json'].url : null;
  },

  createLabel: function (feature) {
    return `${feature.properties.value} %g`;
  }

});

export { ShakemapPSA30Overlay };
