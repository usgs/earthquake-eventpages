'use strict';

var MomentTensorView = require('moment-tensor/MomentTensorView'),
    Product = require('pdl/Product'),
    Xhr = require('util/Xhr');

Xhr.ajax({
  url: '/events/us10004u1y.json',
  success: function (data) {
    var product,
        tensor;

    product = Product(data.properties.products['moment-tensor'][0]);

    MomentTensorView({
      el: document.querySelector('#momenttensorview-example'),
      model: product
    }).render();
  },
  error: function (e) {
    document.querySelector('#momenttensorview-example').innerHTML = [
      '<p class="alert error">',
        'Failed to create a moment tensor view.',
      '</p>'
    ].join('');
    throw e;
  }
});
