import * as L from 'leaflet';

/**
 * Landscan overlay for leaflet map
 */
// tslint:disable-next-line:variable-name
const USFaultsOverlay = L.TileLayer.extend({
  // Flag to tell if constructor has finished
  _initialized: false,
  bounds: null,
  enabled: true,
  id: 'us-faults',
  legend: null,
  title: 'U.S. Faults',

  /**
   * Build leaflet overlay
   */
  initialize: function(options) {
    const legend = document.createElement('img');

    legend.src = './assets/legend-us-faults.png';
    legend.setAttribute('alt', 'U.S. Faults Legend');
    this.legend = legend;

    // Create the two layers
    L.TileLayer.prototype.initialize.call(
      this,
      'https://earthquake.usgs.gov/basemap/tiles/faults/{z}/{y}/{x}.png',
      {
        attribution: '',
        maxZoom: 16
      }
    );
  }
});

export { USFaultsOverlay };
