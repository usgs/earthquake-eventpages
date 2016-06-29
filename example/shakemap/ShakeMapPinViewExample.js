'use strict';

var ShakeMapPinView = require('shakemap/ShakeMapPinView'),
    Product = require('pdl/Product'),
    Xhr = require('util/Xhr');

Xhr.ajax({
  url: '/events/us10004u1y.json',
  success: function (data) {
    var product;

    product = Product(data.properties.products.shakemap[0]);

    ShakeMapPinView({
      el: document.querySelector('.shakemap-pin-view-example'),
      model: product,
      module: {ID: 'shakemap', TITLE: 'ShakeMap'}
    }).render();
  },
  error: function () {
    document.querySelector('.shakemap-pin-view-example').innerHTML = [
      '<p class="alert error">',
        'Failed to create a shakemap pin.',
      '</p>'
    ].join('');
  }
});
