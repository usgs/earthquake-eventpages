import * as L from 'leaflet';

import { ShakemapContoursOverlay } from './shakemap-contours-overlay';


/**
 * Shakemap PGV overlay for the shakemap
 */
const ShakemapPGVOverlay = ShakemapContoursOverlay.extend({


  id: 'shakemap-pgv',
  title: 'Shakemap PGV Contours',
  legend: null,

  /**
   * Init function to build contours for the overlay
   * @param product
   *     The product from this event
   */
  initialize: function (product: any) {
    ShakemapContoursOverlay.prototype.initialize.call(this);

    this.url = this.getUrl(product);
  },

  /**
   * Returns the cont_pgv url, if exists
   * @param product
   *     The product from this event
   */
  getUrl: function (product: any) {
    if (product == null) {
      return null;
    }

    return product.contents['download/cont_pgv.json'] ?
         product.contents['download/cont_pgv.json'].url : null;
  },

  /**
   * Creates/formats a label for this product feature
   * @param feature
   *     The feature from product
   */
  createLabel: function (feature: any) {
    return `${feature.properties.value} cm/s`;
  },

});


export { ShakemapPGVOverlay };
