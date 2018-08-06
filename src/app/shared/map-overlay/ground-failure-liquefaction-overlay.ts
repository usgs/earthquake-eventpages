import * as L from 'leaflet';


/**
 * Ground failure overlay for the leaflet map
 */
const GroundFailureLiquefactionOverlay = L.ImageOverlay.extend({
  id: 'ground-failure-liquefaction',
  enabled: false,
  title: 'Liquefaction Estimate',
  bounds: null,
  legend: null,


  /**
   * Init function to set up bounds and legend for the leaflet map
   * @param product
   *     The product from this event
   */
  initialize: function (product: any) {

    if (!product || !product.properties || !product.contents) {
      return this;
    }

    // setup liquefaction overlay bounds
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

    // set liquefaction legend
    const legend = document.createElement('img');
    legend.src = './assets/legend-liquefaction.png';
    legend.setAttribute('alt', 'Liquefaction Estimate Legend');
    this.legend = legend;

    // Call overlay super initialize method
    L.ImageOverlay.prototype.initialize.call(
      this,
      product.contents[product.properties['liquefaction-overlay']].url,
      [
        [
          product.properties['liquefaction-minimum-latitude'],
          product.properties['liquefaction-minimum-longitude']
        ],
        [
          product.properties['liquefaction-maximum-latitude'],
          product.properties['liquefaction-maximum-longitude']
        ]
      ],
      {
        maxZoom: 16
      }
    );
  }
});


export { GroundFailureLiquefactionOverlay };


