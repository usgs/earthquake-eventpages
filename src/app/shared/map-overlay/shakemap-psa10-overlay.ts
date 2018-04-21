import * as L from 'leaflet';

import { AsynchronousGeoJSONOverlay } from './asynchronous-geojson-overlay';


export class ShakemapPSA10Overlay extends AsynchronousGeoJSONOverlay {

  public id = 'shakemap-psa10';
  public title = 'Shakemap PSA10 Contours';
  public legend = null;

  constructor (public product: any) {
    super();

    this.url = this.getUrl(product);
  }

  getUrl (product) {
    if (product == null) {
      return null;
    }

    return product.contents['download/cont_psa10.json'] ?
         product.contents['download/cont_psa10.json'].url : null;
  }

  onEachFeature (feature, layer) {
    if (feature.properties) {
      layer.bindPopup(`${feature.properties.value} %g`);
    }
  }

  style (feature) {
    // set default line style
    const lineStyle = {
      'color': '#fff',
      'opacity': 1
    };

    return lineStyle;
  }

}
