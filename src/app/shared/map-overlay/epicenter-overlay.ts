import * as L from 'leaflet';


/**
 * Epicenter overlay for leaflet map
 */
const EpicenterOverlay = L.Marker.extend({
  id: 'epicenter',
  enabled: true,
  title: 'Epicenter',
  bounds: null,
  legend: null,


  /**
   * Build leaflet overlay
   *
   * @param product
   *     origin product
   */
  initialize: function (product: any) {
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
    this.legend = legend;

    L.Marker.prototype.initialize.call(
      this,
      [latitude, longitude],
      {
        icon: L.icon({
          iconUrl: 'assets/star.png',
          iconSize: [16, 16],
          iconAnchor: [8, 8]
        }),
        interactive: false
      }
    );
  }
});

export { EpicenterOverlay };
