import * as L from 'leaflet';

import { ShakemapContoursOverlay } from './shakemap-contours-overlay';


const ShakemapPGVOverlay = ShakemapContoursOverlay.extend({

  id: 'shakemap-pgv',
  title: 'Shakemap PGV Contours',
  legend: null,

  initialize: function (product) {
    ShakemapContoursOverlay.prototype.initialize.call(this);

    this.url = this.getUrl(product);
  },

  getUrl: function (product) {
    if (product == null) {
      return null;
    }

    return product.contents['download/cont_pgv.json'] ?
         product.contents['download/cont_pgv.json'].url : null;
  },

  createLabel: function (feature) {
    return `${feature.properties.value} cm/s`;
  },

});

export { ShakemapPGVOverlay };
