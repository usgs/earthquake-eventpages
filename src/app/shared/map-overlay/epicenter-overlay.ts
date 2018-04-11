import * as L from 'leaflet';


const EpicenterOverlay = L.Marker.extend({
  id: 'epicenter',
  isOverlay: true,
  enabled: true,
  title: 'Epicenter',
  bounds: null,
  legend: null,
  layer: null,

  initialize: function (product: any) {
    const properties = product ? product.properties : {};
    const latitude = +properties.latitude || 0;
    const longitude = +properties.longitude || 0;

    this.layer = this;

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


