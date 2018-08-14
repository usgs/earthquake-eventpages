import { ProductContentPipe } from '../product-content.pipe';
import { ShakemapContoursOverlay } from './shakemap-contours-overlay';

/**
 * Shakemap PSA10 overlay for shakemap leaflet
 */
export ShakemapPSA10Overlay = ShakemapContoursOverlay.extend({
  id: 'shakemap-psa10',
  legend: null,
  title: 'Shakemap PSA10 Contours',

  /**
   * Build leaflet overlay
   *
   * @param product
   *     shakemap product
   */
  initialize: function(product: any) {
    ShakemapContoursOverlay.prototype.initialize.call(this);

    this.url = this.getUrl(product);
  },

  /**
   * Returns the url associated with this product
   *
   * @param product
   *     shakemap product
   */
  getUrl: function(product: any) {
    if (product === null) {
      return null;
    }

    const productContentPipe = new ProductContentPipe();
    const content = productContentPipe.transform(
      product,
      'download/cont_psa1p0.json',
      'download/cont_psa10.json'
    );

    return content ? content.url : null;
  },

  /**
   * Creates/formats a label for the product feature
   *
   * @param feature
   *     The feature type from the product
   */
  createLabel: function(feature: any) {
    return `${feature.properties.value} %g`;
  }
});

export { ShakemapPSA10Overlay };
