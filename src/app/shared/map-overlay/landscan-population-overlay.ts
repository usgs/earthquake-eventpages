import { Overlay } from './overlay';
import * as L from 'leaflet';

export class LandscanPopulationOverlay implements Overlay {

  public id = 'landscan-population';
  public bounds = null;
  public enabled = true;
  public layer = L.tileLayer('https://earthquake.usgs.gov/arcgis/rest' +
      '/services/eq/pager_landscan2012bin/MapServer/tile/{z}/{y}/{x}', {
        attribution:
          '<a href="https://web.ornl.gov/sci/landscan/" target="_blank">' +
            'LandScan™ 2012 High Resolution global Population Data Set ' +
            '©UT BATTELLE, LLC.' +
          '</a>',
        maxZoom: 16
      });
  public legend = null;
  public title = 'LandScan Population';

}
