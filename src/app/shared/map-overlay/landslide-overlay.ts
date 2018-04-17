import * as L from 'leaflet';


const LandslideOverlay = L.ImageOverlay.extend({
  id: 'landslide',
  isOverlay: true,
  enabled: false,
  title: 'Landslide Estimate',
  bounds: null,
  legend: null,
  layer: null,

  initialize: function (product: any) {
    const legend = document.createElement('img');

    this.layer = this;

    // setup landslide overlay bounds
    this.bounds = [
      [
        product.properties['minimum-latitude'],
        product.properties['minimum-longitude']
      ],
      [
        product.properties['maximum-latitude'],
        product.properties['maximum-longitude']
      ]
    ];

    // set landslide legend
    legend.src = './assets/legend-landslide.png';
    legend.setAttribute('alt', 'Landslide Estimate Legend');
    this.legend = legend;

    // Call overlay super initialize method
    L.ImageOverlay.prototype.initialize.call(
      this,
      product.contents[product.properties['landslide-overlay']].url,
      [
        [
          product.properties['landslide-minimum-latitude'],
          product.properties['landslide-minimum-longitude']
        ],
        [
          product.properties['landslide-maximum-latitude'],
          product.properties['landslide-maximum-longitude']
        ]
      ],
      {
        maxZoom: 16
      }
    );
  }
});

export { LandslideOverlay };


