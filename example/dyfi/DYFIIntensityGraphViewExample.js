'use strict';

var DYFIIntensityGraphView = require('dyfi/DYFIIntensityGraphView'),
    Product = require('pdl/Product'),
    Xhr = require('util/Xhr');

Xhr.ajax({
  url: '/events/us10004u1y.json',
  success: function (data) {
    var product;

    product = Product(data.properties.products.dyfi[0]);

    DYFIIntensityGraphView({
      el: document.querySelector('#dyfi-intensity-graph-view-example'),
      model: product.getContent('dyfi_plot_atten.json')
    }).render();
  },
  error: function () {
    document.querySelector('#dyfi-intensity-graph-view-example').innerHTML = [
      '<p class="alert error">',
        'Failed to create a dyfi intensity graph view.',
      '</p>'
    ].join('');
  }
});
