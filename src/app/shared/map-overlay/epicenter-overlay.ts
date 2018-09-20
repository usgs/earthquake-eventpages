import * as L from 'leaflet';

/**
 * Epicenter overlay for leaflet map
 */
// tslint:disable-next-line:variable-name
const EpicenterOverlay = L.Marker.extend({
  bounds: null,
  enabled: true,
  id: 'epicenter',
  legends: [],
  title: 'Epicenter',

  /**
   * Build leaflet overlay
   *
   * @param product
   *     origin product
   */
  initialize: function(product: any) {
    let latitude: number;
    let longitude: number;

    try {
      latitude = +product.properties.latitude || 0;
    } catch (e) {
      latitude = 0;
    }

    try {
      longitude = +product.properties.longitude || 0;
    } catch (e) {
      longitude = 0;
    }

    this.bounds = [
      [latitude - 2.0, longitude - 2.0],
      [latitude + 2.0, longitude + 2.0]
    ];

    const legend = document.createElement('img');
    legend.src = './assets/legend-epicenter.png';
    legend.setAttribute('alt', 'Epicenter marker legend');

    // Add to legends array
    this.legends.push(legend);

    L.Marker.prototype.initialize.call(this, [latitude, longitude], {
      icon: L.icon({
        iconAnchor: [8, 8],
        iconSize: [16, 16],
        iconUrl: 'assets/star.png'
      }),
      interactive: false
    });
  }
});

export { EpicenterOverlay };
