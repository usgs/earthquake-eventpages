'use strict';

var FiniteFaultView = require('finite-fault/FiniteFaultView'),
    Product = require('pdl/Product'),
    Xhr = require('util/Xhr');

Xhr.ajax({
  url: '/events/us10004u1y.json',
  success: function (data) {
    var product;

    product = Product(data.properties.products['finite-fault'][0]);

    FiniteFaultView({
      el: document.querySelector('#finite-fault-view-example'),
      model: product
    }).render();
  },
  error: function () {
    document.querySelector('#finite-fault-view-example').innerHTML = [
      '<p class="alert error">',
        'Failed to create a finite fault view.',
      '</p>'
    ].join('');
  }
});
