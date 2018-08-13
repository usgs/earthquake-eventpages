
import { ShakemapContoursOverlay } from './shakemap-contours-overlay';

/**
 * Shakemap PGA overlay for leaflet map
 */
const ShakemapPGAOverlay = ShakemapContoursOverlay.extend({
  id: 'shakemap-pga',
  title: 'Shakemap PGA Contours',
  legend: null,

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
   * Returns the cont_pga url if exists from the product
   *
   * @param product
   *     shakemap product
   */
  getUrl: function(product: any) {
    if (product == null) {
      return null;
    }

    return product.contents['download/cont_pga.json']
      ? product.contents['download/cont_pga.json'].url
      : null;
  },

  /**
   * Creates/formats a label for the product feature
   *
   * @param feature
   *     The feature from this product
   */
  createLabel: function(feature: any) {
    return `${feature.properties.value} %g`;
  }
});

export { ShakemapPGAOverlay };
