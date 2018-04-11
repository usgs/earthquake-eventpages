import * as L from 'leaflet';


const LandscanPopulationOverlay = L.TileLayer.extend({
  bounds: null,
  enabled: true,
  id: 'landscap-population',
  isOverlay: true,
  layer: this,
  legend: null,
  title: 'LandScan Population',


  initialize: function () {
    L.TileLayer.prototype.initialize.call(
      this,
      'https://earthquake.usgs.gov/arcgis/rest/services' +
          '/eq/pager_landscan2012bin/MapServer/tile/{z}/{y}/{x}',
      {
        attribution:
          '<a href="https://web.ornl.gov/sci/landscan/" target="_blank">' +
            'LandScan™ 2012 High Resolution global Population Data Set ' +
            '©UT BATTELLE, LLC.' +
          '</a>',
        maxZoom: 16
      }
    );
  }
});


export { LandscanPopulationOverlay };
