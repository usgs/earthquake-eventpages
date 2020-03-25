import { AsynchronousCovJSONOverlay } from './asynchronous-covjson-overlay';

import * as L from 'leaflet';

/**
 * Shakemap contours overlay for leaflet map
 */
// tslint:disable-next-line:variable-name
const ShakemapMmiCoverageOverlay = AsynchronousCovJSONOverlay.extend({
  id: 'shakemap-mmi-coverage',
  legends: [],
  title: 'Shakemap MMI Coverage',

  /**
   * Build leaflet overlay
   *
   * @param product
   *     The product from this event
   */
  initialize: function(product: any) {
    AsynchronousCovJSONOverlay.prototype.initialize.call(this);

    const intensityLegend = document.createElement('img');
    intensityLegend.src = './assets/shakemap-intensity-legend-small.png';
    intensityLegend.setAttribute('alt', 'Intensity Scale legend');

    // Add to legends array
    this.legends.push(intensityLegend);
    this.url = this.getUrl(product);
  },

  /**
   * Returns the high res coverage url from the product, if exists
   *
   * @param product
   *     shakemap product
   */
  getUrl: function(product: any) {
    if (!product || !product.contents) {
      return null;
    }

    return product.contents['download/coverage_mmi_high_res.covjson']
      ? product.contents['download/coverage_mmi_high_res.covjson'].url
      : null;
  },
});

export { ShakemapMmiCoverageOverlay };
