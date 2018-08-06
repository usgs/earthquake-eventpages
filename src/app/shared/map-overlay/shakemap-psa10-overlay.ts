import * as L from 'leaflet';

import { ShakemapContoursOverlay } from './shakemap-contours-overlay';


/**
 * ShakemapPSA10 overlay for shakemap leaflet
 */
const ShakemapPSA10Overlay = ShakemapContoursOverlay.extend({

  id: 'shakemap-psa10',
  title: 'Shakemap PSA10 Contours',
  legend: null,

  /**
   * Init function to generate the contours overlay
   * @param product
   *     The product from this event
   */
  initialize: function (product: any) {
    ShakemapContoursOverlay.prototype.initialize.call(this);

    this.url = this.getUrl(product);
  },

  /**
   * Returns the url associated with this product
   * @param product
   *     The product from this event
   */
  getUrl: function (product: any) {
    if (product == null) {
      return null;
    }

    return product.contents['download/cont_psa10.json'] ?
         product.contents['download/cont_psa10.json'].url : null;
  },

  /**
   * Creates/formats a label for the product feature
   * @param feature
   *     The feature type from the product
   */
  createLabel: function (feature: any) {
    return `${feature.properties.value} %g`;
  }

});


export { ShakemapPSA10Overlay };
