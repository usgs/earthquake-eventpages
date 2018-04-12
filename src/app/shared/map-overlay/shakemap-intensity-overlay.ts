import * as L from 'leaflet';

import { AsynchronousGeoJSONOverlay } from './asynchronous-geojson-overlay';


export class ShakemapIntensityOverlay extends AsynchronousGeoJSONOverlay {

  public id = 'shakemap-intensity';
  public enabled = true;
  public title = 'Shakemap MMI Contours';

  public bounds: Array<any>;
  public layer: L.Layer;
  public legend: string = null;

  public httpClient: any = null;
  public url: string = null;

  constructor (private product: any) {
    super();

    this.url = this.getUrl(product);
  }

  getUrl (product) {
    if (product == null) {
      return null;
    }

    return product.contents['download/cont_mi.json'].url || null;
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

  onEachFeature (feature, layer) {
    if (feature.properties) {
      layer.bindPopup(feature.properties.value.toString());
    }
  }

}
