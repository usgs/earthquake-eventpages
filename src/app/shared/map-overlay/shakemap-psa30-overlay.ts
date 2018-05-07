import * as L from 'leaflet';

import { AsynchronousGeoJSONOverlay } from './asynchronous-geojson-overlay';


const ShakemapPSA30Overlay = AsynchronousGeoJSONOverlay.extend({

  id: 'shakemap-psa30',
  title: 'Shakemap PSA30 Contours',
  legend: null,

  initialize: function (product) {
    AsynchronousGeoJSONOverlay.prototype.initialize.call(this);

    this.url = this.getUrl(product);
  },

  getUrl: function (product) {
    if (product == null) {
      return null;
    }

    return product.contents['download/cont_psa30.json'] ?
         product.contents['download/cont_psa30.json'].url : null;
  },

  onEachFeature: function (feature, layer) {
    if (feature.properties) {
      const t = L.tooltip({
        permanent: true
      }).setContent(`${feature.properties.value} %g`);

      layer.bindTooltip(t);
    }
  },

  afterAdd: function () {
    this.eachLayer((layer) => {
      layer.openTooltip();
    });
  },

  style: function (feature) {
    // set default line style
    const lineStyle = {
      'color': '#fff',
      'opacity': 1
    };

    return lineStyle;
  }

});

export { ShakemapPSA30Overlay };
