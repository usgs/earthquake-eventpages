import { Overlay } from './overlay';
import * as L from 'leaflet';

export class HistoricSeismicityOverlay implements Overlay {

  public id = 'historic-seismicity';
  public bounds = null;
  public enabled = true;
  public layer = L.tileLayer('https://earthquake.usgs.gov/arcgis/rest' +
      '/services/eq/catalog/MapServer/tile/{z}/{y}/{x}', {
        maxZoom: 16
      });
  public legend = '<img src="./assets/legend-historic-seismicity.png" ' +
      'alt="Epicenter marker legend" />';
  public title = 'Historic Seismicity';

}
