import * as L from 'leaflet';


const HistoricSeismicityOverlay = L.TileLayer.extend({
  bounds: null,
  enabled: true,
  id: 'historic-seismicity',
  isOverlay: true,
  layer: null,
  legend: null,
  title: 'Historic Seismicity',


  initialize: function () {
    const legend = document.createElement('img');

    this.layer = this;

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
