import * as L from 'leaflet';

import { AsynchronousGeoJSONOverlay } from './asynchronous-geojson-overlay';


export class ShakemapIntensityOverlay extends AsynchronousGeoJSONOverlay {

  public id = 'shakemap-intensity';
  public title = 'Shakemap MMI Contours';
  public legend = null;

  constructor (public product: any) {
    super();

    const legend = document.createElement('img');
    legend.src = './assets/shakemap-intensity-legend-small.png';
    legend.setAttribute('alt', 'Intensity scale legend');
    this.layer.legend = legend;

    this.url = this.getUrl(product);
  }

  getUrl (product) {
    if (product == null) {
      return null;
    }

    return product.contents['download/cont_mi.json'].url || null;
  }

  onEachFeature (feature, layer) {
    if (feature.properties) {
      layer.bindPopup(feature.properties.value.toString());
    }
  }

  style (feature) {
    // set default line style
    const lineStyle = {
      'color': feature.properties.color,
      'weight': feature.properties.weight,
      'opacity': 1
    };

    return lineStyle;
  }

}
