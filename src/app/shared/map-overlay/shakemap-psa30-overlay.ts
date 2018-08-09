import * as L from 'leaflet';

import { ProductContentPipe } from '../product-content.pipe';
import { ShakemapContoursOverlay } from './shakemap-contours-overlay';


/**
 * PSA30 Overlay for a shakemap product
 */
const ShakemapPSA30Overlay = ShakemapContoursOverlay.extend({


  id: 'shakemap-psa30',
  title: 'Shakemap PSA30 Contours',
  legend: null,

  /**
   * Init function that generates shakemap contours
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

    const productContentPipe = new ProductContentPipe();
    const content = productContentPipe.transform(
        product,
        'download/cont_psa3p0.json',
        'download/cont_psa30.json'
    );

    return content ? content.url : null;
  },

  /**
   * Creates a formatted label
   * @param feature
   *     The feature type for this product
   */
  createLabel: function (feature: any) {
    return `${feature.properties.value} %g`;
  }

});


export { ShakemapPSA30Overlay };
