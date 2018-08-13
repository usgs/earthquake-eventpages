import * as L from 'leaflet';

/**
 * Ground failure landslide overlay for leaflet map
 */
const GroundFailureLandslideOverlay = L.ImageOverlay.extend({
  id: 'ground-failure-landslide',
  enabled: false,
  title: 'Landslide Estimate',
  bounds: null,
  legend: null,

  /**
   * Build leaflet overlay
   *
   * @param product
   *     ground-failure product
   */
  initialize: function(product: any) {
    if (!product || !product.properties || !product.contents) {
      return this;
    }

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
    const legend = document.createElement('img');
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

export { GroundFailureLandslideOverlay };
