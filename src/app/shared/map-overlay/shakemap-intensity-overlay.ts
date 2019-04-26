import * as L from 'leaflet';

import { GetMapBoundsPipe } from '@shared/get-map-bounds.pipe';
import { ProductContentPipe } from '@shared/product-content.pipe';

/**
 * Shakemaop intensity overlay for leaflet map
 */
// tslint:disable-next-line:variable-name
const ShakemapIntensityOverlay = L.ImageOverlay.extend({
  id: 'shakemap-intensity',
  legends: [],
  opacity: .5,
  title: 'Shakemap Intensity',

  /**
   * Build leaflet overlay
   *
   * @param product
   *     shakemap product
   */
  initialize: function(product: any) {
    const intensityLegend = document.createElement('img');
    intensityLegend.src = './assets/shakemap-intensity-legend-small.png';
    intensityLegend.setAttribute('alt', 'Intensity Scale legend');

    const contourLegend = document.createElement('img');
    contourLegend.src = './assets/legend-intensity-contour.png';
    contourLegend.setAttribute('alt', 'Intensity Contour Legend');

    // Add to legends array
    this.legends.push(intensityLegend, contourLegend);

    const imageUrl = this.getUrl(product);
    const bounds = this.getMapBounds(product);

    L.ImageOverlay.prototype.initialize.call(
      this, imageUrl, bounds,
      {opacity: this.opacity}
    );
  },

  getMapBounds: function(product: any) {
    if (!product) {
      return null;
    }

    const getMapBoundsPipe = new GetMapBoundsPipe();
    return getMapBoundsPipe.transform(product) || null;
  },

  /**
   * Returns the cont_mi url from the product, if exists
   *
   * @param product
   *     shakemap product
   */
  getUrl: function(product: any) {
    if (product === null) {
      return null;
    }

    let url: string = null;
    const productContentPipe = new ProductContentPipe();
    const contentOptions = [
      'download/intensity_overlay.png',
      'download/ii_overlay.png'
    ];

    const content = productContentPipe.transform(product, ...contentOptions);
    if (content) {
      url = content.url;
    }
    return url;
  },
});

export { ShakemapIntensityOverlay };
