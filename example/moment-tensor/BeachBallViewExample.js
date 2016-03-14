'use strict';

var BeachBallView = require('moment-tensor/BeachBallView'),
    Product = require('pdl/Product'),
    Tensor = require('moment-tensor/Tensor'),
    Xhr = require('util/Xhr');

Xhr.ajax({
  url: '/events/us10004u1y.json',
  success: function (data) {
    var product,
        tensor;

    product = Product(data.properties.products['moment-tensor'][0]);
    tensor = Tensor.fromProduct(product);

    BeachBallView({
      el: document.querySelector('#beachballview-example'),
      tensor: tensor
    }).render();
  },
  error: function () {
    document.querySelector('#beachballview-example').innerHTML = [
      '<p class="alert error">',
        'Failed to create a beachball view.',
      '</p>'
    ].join('');
  }
});
