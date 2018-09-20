import { MouseOverLayer } from '@shared/map-overlay/mouse-over-layer';

const _FAULTS_URL = 'https://earthquake.usgs.gov/basemap/tiles/faults';

/**
 * US Faults overlay for leaflet map
 */
// tslint:disable-next-line:variable-name
const USFaultsOverlay = MouseOverLayer.extend({
  bounds: null,
  enabled: true,
  id: 'us-faults',
  legends: [],
  title: 'U.S. Faults',

  dataUrl: null,
  tileUrl: null,

  /**
   * Build leaflet overlay
   */
  initialize: function(options) {
    const legend = document.createElement('img');
    legend.src = './assets/legend-us-faults.png';
    legend.setAttribute('alt', 'U.S. Faults Legend');

    // Add to legends array
    this.legends.push(legend);

    this.tileUrl = _FAULTS_URL + '/{z}/{x}/{y}.png';
    this.dataUrl = _FAULTS_URL + '/{z}/{x}/{y}.grid.json?callback={cb}';

    MouseOverLayer.prototype.initialize.call(this, {
      dataUrl: this.dataUrl,
      legend: this.legend,
      tileUrl: this.tileUrl,
      tiptext: '{NAME}'
    });
  }
});

export { USFaultsOverlay };
