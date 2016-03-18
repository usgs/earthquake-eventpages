'use strict';

var DYFIView = require('dyfi/DYFIView'),
    Product = require('pdl/Product'),
    Xhr = require('util/Xhr');

Xhr.ajax({
  url: '/events/us10004u1y.json',
  success: function (data) {
    var product;

    product = Product(data.properties.products.dyfi[0]);

    DYFIView({
      el: document.querySelector('#dyfi-view-example'),
      model: product
    }).render();
  },
  error: function () {
    document.querySelector('#dyfi-view-example').innerHTML = [
      '<p class="alert error">',
        'Failed to create a DYFI view.',
      '</p>'
    ].join('');
  }
});
