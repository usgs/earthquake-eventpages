import * as L from 'leaflet';

import { ProductContentPipe } from '../product-content.pipe';
import { ShakemapContoursOverlay } from './shakemap-contours-overlay';


/**
 * Shakemap PSA03 overlay for leaflet map
 */
const ShakemapPSA03Overlay = ShakemapContoursOverlay.extend({

  id: 'shakemap-psa03',
  title: 'Shakemap PSA03 Contours',
  legend: null,


  /**
   * Build leaflet overlay
   *
   * @param product
   *     shakemap product
   */
  initialize: function (product: any) {
    ShakemapContoursOverlay.prototype.initialize.call(this);

    this.url = this.getUrl(product);
  },

  /**
   * Returns the psa03 url from this product, if exists
   * @param product
   *     shakemap product
   */
  getUrl: function (product: any) {
    if (product == null) {
      return null;
    }

    const productContentPipe = new ProductContentPipe();
    const content = productContentPipe.transform(
        product,
        'download/cont_psa0p3.json',
        'download/cont_psa03.json'
    );

    return content ? content.url : null;
  },

  /**
   * Creates/formats a label for this feature
   * @param feature
   *     The feature from this product
   */
  createLabel: function (feature: any) {
    return `${feature.properties.value} %g`;
  }

});

export { ShakemapPSA03Overlay };
