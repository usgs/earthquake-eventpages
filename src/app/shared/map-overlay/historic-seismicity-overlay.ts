import * as L from 'leaflet';

/**
 * Historic seismicity overlay for leaflet map
 */
// tslint:disable-next-line:variable-name
const HistoricSeismicityOverlay = L.TileLayer.extend({
  bounds: null,
  enabled: true,
  id: 'historic-seismicity',
  legends: [],
  title: 'Historic Seismicity',

  /**
   * Build leaflet overlay
   */
  initialize: function() {
    const legend = document.createElement('img');
    legend.src = './assets/legend-historic-seismicity.png';
    legend.setAttribute('alt', 'Historic seismicity legend');

    // Add to legends array
    this.legends = [legend];

    L.TileLayer.prototype.initialize.call(
      this,
      'https://earthquake.usgs.gov/arcgis/rest/services' +
        '/eq/catalog/MapServer/tile/{z}/{y}/{x}',
      {
        maxZoom: 16
      }
    );
  }
});

export { HistoricSeismicityOverlay };
