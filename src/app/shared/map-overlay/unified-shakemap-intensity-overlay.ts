import * as L from 'leaflet';


const COVERAGE_HIGHRES = 'download/coverage_mmi_high_res.covjson';
const COVERAGE_LOWRES = 'download/coverage_mmi_low_res.covjson';
const IMAGE_OVERLAY1 = 'download/intensity_overlay.png';
const IMAGE_OVERLAY2 = 'download/ii_overlay.png';

import { GetMapBoundsPipe } from '../get-map-bounds.pipe';
import {AsynchronousCovJSONOverlay} from './asynchronous-covjson-overlay';

const UnifiedShakemapIntensityOverlay = L.LayerGroup.extend({

  id: 'shakemap-instensity',
  legends: null,
  map: null,
  opacity: 0.3,
  title: 'ShakeMap Intensity',
  url: '',

  initialize: function (product: any, preferLowres = false) {
    L.LayerGroup.prototype.initialize.call(this, []);
    const layer = this.getCoverageOverlay(product) || this.getImageOverlay(product);
    if (layer) {
      this.url = layer.url;
      this.addLayer(layer);
    }
    this.legends = this.legends || this.getLegends();
  },

  getCoverageOverlay: function (product: any, preferLowres: bool) {
    const contents = product.contents || {};
    const coverage = (preferLowres && contents[COVERAGE_LOWRES]) ? contents[COVERAGE_LOWRES] : contents[COVERAGE_HIGHRES];
    if (!coverage) {
      return null;
    }
    const layer = AsynchronousCovJSONOverlay()
    layer.coverageParam = 'MMI';
    layer.url = coverage.url;
  },

  getImageOverlay: function (product: any) {
    const contents = product.contents || {};
    const image = contents[IMAGE_OVERLAY1] || contents[IMAGE_OVERLAY2];
    if (!image) {
      return null;
    }
    const bounds = new GetMapBoundsPipe().transform(product);
    const layer = L.imageOverlay(image.url, bounds, {opacity: this.opacity})
    layer.url = image.url;
    return layer;
  },

  getLegends: function () {
    const intensityLegend = document.createElement('img');
    intensityLegend.src = './assets/shakemap-intensity-legend-small.png';
    intensityLegend.setAttribute('alt', 'Intensity Scale legend');
    return [intensityLegend];
  }

});


export { UnifiedShakemapIntensityOverlay };
