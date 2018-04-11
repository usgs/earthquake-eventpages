import { HttpClient } from '@angular/common/http';

import { AsyncGeoJsonOverlay } from './async-geojson-overlay';

import * as L from 'leaflet';


export class IntensityOverlay extends AsyncGeoJsonOverlay {

  public id = 'shakemap-mmi-contours';
  public enabled = true;
  public title = 'Shakemap MMI Contours';

  public bounds: Array<any>;
  public layer: L.Layer;
  public legend: string = null;

  constructor (private product: any,
                public httpClient: HttpClient) {
    super(httpClient);

    const url = this.getUrl(product)
    const options = {
      style: this.style,
      onEachFeature: this.onEachFeature,
    }

    this.initializeLayer(url, options);
  }

  getUrl(product) {
    return product.contents['download/cont_mi.json'].url;
  }

  style (feature, latlng) {

    // set default line style
    const lineStyle = {
      "color": "#EFEFF0",
      "weight": 2,
      "opacity": 1
    };

    // oscillate line thickness
    if (lineStyle.weight == 4) {
      lineStyle.weight = 2;
    } else {
      lineStyle.weight = 4;
    }

    lineStyle.color = feature.properties.color;
    return lineStyle;
  }

  onEachFeature (feature, layer) {
    if (feature.properties) {
      layer.bindPopup(feature.properties.value.toString());
    }
  }

};
