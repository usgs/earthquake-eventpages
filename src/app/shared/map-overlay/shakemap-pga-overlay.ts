import * as L from 'leaflet';

import { AsynchronousGeoJSONOverlay } from './asynchronous-geojson-overlay';


export class ShakemapPGAOverlay extends AsynchronousGeoJSONOverlay {

  public id = 'shakemap-pga';
  public title = 'Shakemap PGA Contours';
  public legend = null;

  constructor (public product: any) {
    super();

    this.url = this.getUrl(product);
  }

  getUrl (product) {
    if (product == null) {
      return null;
    }

    return product.contents['download/cont_pga.json'] ?
         product.contents['download/cont_pga.json'].url : null;
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
