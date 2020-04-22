import * as L from 'leaflet';

import { AsynchronousCovJSONOverlay } from './asynchronous-covjson-overlay';
import { GetMapBoundsPipe } from '@shared/get-map-bounds.pipe';
import { ProductContentPipe } from '@shared/product-content.pipe';

const COVERAGEURL = 'download/coverage_mmi_high_res.covjson';
const IMAGEURLS = [
  'download/intensity_overlay.png',
  'download/ii_overlay.png'
];

/**
 * Shakemaop intensity overlay for leaflet map
 */
// tslint:disable-next-line:variable-name
const ShakemapIntensityOverlay = L.LayerGroup.extend({
  id: 'shakemap-intensity',
  legends: [],
  title: 'Shakemap Intensity',

  /**
   * Build leaflet overlay
   *
   * @param product
   *     shakemap product
   */
  initialize: function(product: any) {
    L.LayerGroup.prototype.initialize.call(this, []);

    const legend = document.createElement('img');
    legend.src = './assets/shakemap-intensity-legend-small.png';
    legend.setAttribute('alt', 'Intensity Scale legend');

    this.url = this.getUrl(product);

    this.layer = this.getCoverageLayer() || this.getImageLayer(product);
    if (this.layer) {
      this.addLayer(this.layer);
      this.legends.push(legend);
    }
  },

  /**
   * Returns a coverage layer if the right URL is supplied
   */
  getCoverageLayer () {
    if (!this.url || !this.url.includes(COVERAGEURL) || this.layer) {
      return null;
    }

    const layer = new AsynchronousCovJSONOverlay();
    layer.url = this.url;
    layer.coverageParam = 'MMI';

    return layer;
  },

  /**
   * Returns an image overlay layer
   *
   * @param product
   *     Shakemap product required to get map bounds
   */
  getImageLayer (product) {
    if (!this.url || this.layer) {
      return null;
    }

    const bounds = this.getMapBounds(product);
    const layer = L.imageOverlay(this.url, bounds, {opacity: .3});

    return layer;
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
    if (!product) {
      return null;
    }

    let url: string = null;
    const productContentPipe = new ProductContentPipe();
    const contentOptions = [
      COVERAGEURL, ...IMAGEURLS
    ];

    const content = productContentPipe.transform(product, ...contentOptions);
    if (content) {
      url = content.url;
    }
    return url;
  },
});

export { ShakemapIntensityOverlay, COVERAGEURL, IMAGEURLS };
