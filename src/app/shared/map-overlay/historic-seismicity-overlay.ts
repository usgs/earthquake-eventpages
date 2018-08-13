import * as L from 'leaflet';

/**
 * Historic seismicity overlay for leaflet map
 */
const HistoricSeismicityOverlay = L.TileLayer.extend({
  bounds: null,
  enabled: true,
  id: 'historic-seismicity',
  legend: null,
  title: 'Historic Seismicity',

  /**
   * Build leaflet overlay
   */
  initialize: function() {
    const legend = document.createElement('img');

    legend.src = './assets/legend-historic-seismicity.png';
    legend.setAttribute('alt', 'Historic seismicity legend');
    this.legend = legend;

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
