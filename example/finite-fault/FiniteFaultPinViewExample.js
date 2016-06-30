'use strict';

var FiniteFaultPinView = require('finite-fault/FiniteFaultPinView'),
    Product = require('pdl/Product'),
    Xhr = require('util/Xhr');

Xhr.ajax({
  url: '/events/us10004u1y.json',
  success: function (data) {
    var product;

    product = Product(data.properties.products['finite-fault'][0]);

    FiniteFaultPinView({
      el: document.querySelector('.finite-fault-pin-view-example'),
      model: product
    }).render();
  },
  error: function () {
    document.querySelector('.finite-fault-pin-view-example').innerHTML = [
      '<p class="alert error">',
        'Failed to create a FiniteFaultPinView.',
      '</p>'
    ].join('');
  }
});
