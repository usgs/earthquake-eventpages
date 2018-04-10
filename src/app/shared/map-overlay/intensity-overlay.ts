import { HttpClient } from '@angular/common/http';

import * as L from 'leaflet';

import { asynchronousGeoJson } from './async-geojson';
import { Overlay } from './overlay';

export class IntensityOverlay implements Overlay {

  public id = 'intensity';
  public enabled = true;
  public title = 'Intensity';

  public bounds: Array<any>;
  public layer: L.Layer;
  public legend: string = null;

  constructor (private product: any,
                public httpClient: HttpClient) {
    const options = {
      style: this.getStyle,
      onEachFeature: this.onEachFeature,
      url: '',
      httpClient: httpClient
    };

    this.layer = asynchronousGeoJson(options)
  }

  getStyle(feature, latlng) {
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

  onEachFeature(feature, layer) {
    if (feature.properties) {
      layer.bindPopup(feature.properties.value);
    }
  }

};
