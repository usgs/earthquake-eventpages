import * as L from 'leaflet';

/**
 * Landscan overlay for leaflet map
 */
// tslint:disable-next-line:variable-name
const LandscanPopulationOverlay = L.TileLayer.extend({
  bounds: null,
  enabled: true,
  id: 'landscap-population',
  legends: [],
  title: 'LandScan Population',

  /**
   * Build leaflet overlay
   */
  initialize: function() {
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
