import * as L from 'leaflet';

import { ShakemapContoursOverlay } from './shakemap-contours-overlay';


const ShakemapPGAOverlay = ShakemapContoursOverlay.extend({

  id: 'shakemap-pga',
  title: 'Shakemap PGA Contours',
  legend: null,

  initialize: function (product) {
    ShakemapContoursOverlay.prototype.initialize.call(this);

    this.url = this.getUrl(product);
  },

  getUrl: function (product) {
    if (product == null) {
      return null;
    }

    return product.contents['download/cont_pga.json'] ?
         product.contents['download/cont_pga.json'].url : null;
  },

  createLabel: function (feature) {
    return `${feature.properties.value} %g`;
  },

});

export { ShakemapPGAOverlay };
