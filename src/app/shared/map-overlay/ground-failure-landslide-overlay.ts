import * as L from 'leaflet';

/**
 * Ground failure landslide overlay for leaflet map
 */
// tslint:disable-next-line:variable-name
const GroundFailureLandslideOverlay = L.ImageOverlay.extend({
  bounds: null,
  enabled: false,
  id: 'ground-failure-landslide',
  legends: [],
  title: 'Landslide Estimate',

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

    // Add to legends array
    this.legends = [];
    this.legends.push(legend);

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
