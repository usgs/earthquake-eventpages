import * as L from 'leaflet';

import { AsynchronousGeoJSONOverlay } from './asynchronous-geojson-overlay';


export class ShakemapIntensityOverlay extends AsynchronousGeoJSONOverlay {

  public id = 'shakemap-intensity';
  public enabled = true;
  public title = 'Shakemap MMI Contours';
  public legend: string = null;


  constructor (public product: any) {
    super();

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
