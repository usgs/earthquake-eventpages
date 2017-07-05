'use strict';

var DYFIResponsesGraphView = require('dyfi/DYFIResponsesGraphView'),
    Product = require('pdl/Product'),
    Xhr = require('util/Xhr');

Xhr.ajax({
  url: '/events/us10004u1y.json',
  success: function (data) {
    var product;

    product = Product(data.properties.products.dyfi[0]);

    var dyfiResponsesGraphView = DYFIResponsesGraphView({
      el: document.querySelector('#dyfi-responses-graph-view-example'),
      model: product.getContent('dyfi_plot_numresp.json')
    });

    dyfiResponsesGraphView.render();
  },
  error: function () {
    document.querySelector('#dyfi-responses-graph-view-example').innerHTML = [
      '<p class="alert error">',
        'Failed to create a dyfi responses graph view.',
      '</p>'
    ].join('');
  }
});
