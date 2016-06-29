'use strict';

var OriginPinView = require('origin/OriginPinView'),
    Product = require('pdl/Product'),
    Xhr = require('util/Xhr');

Xhr.ajax({
  url: '/events/us10004u1y.json',
  success: function (data) {
    var product;

    product = Product(data.properties.products['phase-data'][0]);

    OriginPinView({
      el: document.querySelector('.origin-pin-view-example'),
      model: product,
      module: {ID: 'phase-data', TITLE: 'Origin'}
    }).render();
  },
  error: function () {
    document.querySelector('.origin-pin-view-example').innerHTML = [
      '<p class="alert error">',
        'Failed to create a Origin pin.',
      '</p>'
    ].join('');
  }
});
