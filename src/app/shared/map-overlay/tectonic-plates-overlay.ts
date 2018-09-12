import * as L from 'leaflet';

/**
 * Landscan overlay for leaflet map
 */
// tslint:disable-next-line:variable-name
const TectonicPlatesOverlay = L.TileLayer.extend({
  bounds: null,
  enabled: true,
  id: 'tectonic-plates',
  legend: null,
  title: 'Tectonic Plates',

  /**
   * Build leaflet overlay
   */
  initialize: function() {
    const legend = document.createElement('img');

    legend.src = './assets/legend-tectonic-plates.png';
    legend.setAttribute('alt', 'Tectonic Plates Legend');
    this.legend = legend;

    L.TileLayer.prototype.initialize.call(
      this,
      'https://earthquake.usgs.gov/basemap/tiles/plates/{z}/{x}/{y}.png',
      {
        attribution: '',
        maxZoom: 16
      }
    );
  }
});

export { TectonicPlatesOverlay };
