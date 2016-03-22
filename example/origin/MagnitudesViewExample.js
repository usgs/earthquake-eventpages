'use strict';

var MagnitudesView = require('origin/MagnitudesView'),
    Product = require('pdl/Product'),
    Xhr = require('util/Xhr');

Xhr.ajax({
  url: '/events/us10004u1y.json',
  success: function (data) {
    var content,
        product;

    product = Product(data.properties.products['phase-data'][0]);
    content = product.getContent('quakeml.xml');

    MagnitudesView({
      el: document.querySelector('#magnitudes-view-example'),
      model: content,
      product: product
    }).render();
  },
  error: function () {
    document.querySelector('#magnitudes-view-example').innerHTML = [
      '<p class="alert error">',
        'Failed to create a Magnitudes view.',
      '</p>'
    ].join('');
  }
});
