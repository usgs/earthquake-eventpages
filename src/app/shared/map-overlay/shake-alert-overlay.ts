import { AsynchronousGeoJSONOverlay } from './asynchronous-geojson-overlay';

/**
 * Shakemaop intensity overlay for leaflet map
 */
// tslint:disable-next-line:variable-name
const ShakeAlertOverlay = AsynchronousGeoJSONOverlay.extend({
  bounds: null,
  // retain layer data to detect whether it's already loaded
  data: null,
  id: 'shakealert',
  legends: [],
  title: 'ShakeAlert',

  /**
   * Build leaflet overlay
   *
   * @param product
   *     shakemap product
   */
  initialize: function(product: any) {
    AsynchronousGeoJSONOverlay.prototype.initialize.call(this);
    // check if geojson data or product is passed
    if (product.features) {
      this.data = product;
      // add data to layer (and map if layer still visible)
      this.addData(this.data);
      this.afterAdd();
    }
    // TODO, once they send a legend
    // const legend = document.createElement('img');
    // legend.src = './assets/shakealert-legend.png';
    // legend.setAttribute('alt', 'ShakeAlert legend');
    // this.legends.push(legend);
  },

  afterAdd: function() {
    this.bounds = this.getBounds();
  },

  /**
   * Sets and returns a default line style
   *
   * @param feature
   *     The feature from this product
   */
  style: function(feature: any) {
    let style = {};

    if (feature && feature.properties) {
      // set default line style
      style = {
        color: feature.properties.stroke,
        fill: feature.properties.fill
      };
    }

    return style;
  }
});

export { ShakeAlertOverlay };
