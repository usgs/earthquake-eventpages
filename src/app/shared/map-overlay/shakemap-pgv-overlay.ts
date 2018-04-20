import * as L from 'leaflet';

import { AsynchronousGeoJSONOverlay } from './asynchronous-geojson-overlay';


export class ShakemapPGVOverlay extends AsynchronousGeoJSONOverlay {

  public id = 'shakemap-pgv';
  public title = 'Shakemap PGV Contours';
  public legend = null;

  constructor (public product: any) {
    super();

    this.url = this.getUrl(product);
  }

  getUrl (product) {
    if (product == null) {
      return null;
    }

    return product.contents['download/cont_pgv.json'] ?
         product.contents['download/cont_pgv.json'].url : null;
  }

  onEachFeature (feature, layer) {
    if (feature.properties) {
      layer.bindPopup(`${feature.properties.value} cm/s`);
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
