import * as L from 'leaflet';

import { Overlay } from './overlay';


export class EpicenterOverlay implements Overlay {

  public id = 'epicenter';
  public enabled = true;
  public title = 'Epicenter';

  public bounds: Array<any>;
  public layer: L.Layer;
  public legend: string = null;

  constructor (product: any) {
    const properties = product ? product.properties : {};
    const latitude = +properties.latitude || 0;
    const longitude = +properties.longitude || 0;

    this.bounds = [
      [latitude - 2.0, longitude - 2.0],
      [latitude + 2.0, longitude + 2.0]
    ];

    this.layer = L.marker(
      [latitude, longitude],
      {
        icon: L.icon({
          iconUrl: 'assets/star.png',
          iconSize: [16, 16],
          iconAnchor: [8, 8]
        }),
        interactive: false
      }
    );
  }

}
