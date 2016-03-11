'use strict';

var ShakeMapView = require('shakemap/ShakeMapView'),
    Product = require('pdl/Product'),
    Xhr = require('util/Xhr');

Xhr.ajax({
  url: '/events/us10004u1y.json',
  success: function (data) {
    var product;

    product = Product(data.properties.products.shakemap[0]);

    ShakeMapView({
      el: document.querySelector('#shakemap-view-example'),
      model: product
    }).render();
  },
  error: function () {
    document.querySelector('#shakemap-view-example').innerHTML = [
      '<p class="alert error">',
        'Failed to create a ShakeMap view.',
      '</p>'
    ].join('');
  }
});
