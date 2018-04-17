import * as L from 'leaflet';


const LiquefactionOverlay = L.ImageOverlay.extend({
  id: 'liquefaction',
  isOverlay: true,
  enabled: false,
  title: 'Liquefaction Estimate',
  bounds: null,
  legend: null,
  layer: null,

  initialize: function (product: any) {
    const legend = document.createElement('img');

    this.layer = this;

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

export { LiquefactionOverlay };


