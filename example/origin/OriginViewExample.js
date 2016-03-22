'use strict';

var OriginView = require('origin/OriginView'),
    Product = require('pdl/Product'),
    Xhr = require('util/Xhr');

Xhr.ajax({
  url: '/events/us10004u1y.json',
  success: function (data) {
    var product;

    product = Product(data.properties.products.origin[0]);

    OriginView({
      el: document.querySelector('#origin-view-example'),
      model: product
    }).render();
  },
  error: function () {
    document.querySelector('#origin-view-example').innerHTML = [
      '<p class="alert error">',
        'Failed to create a Origin view.',
      '</p>'
    ].join('');
  }
});
