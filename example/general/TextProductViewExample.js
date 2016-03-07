'use strict';

var TextProductView = require('general/TextProductView'),
    Product = require('pdl/Product'),
    Xhr = require('util/Xhr');

Xhr.ajax({
  url: '/events/us10004u1y.json',
  success: function (data) {
    TextProductView({
      el: document.querySelector('#text-product-view'),
      model: Product(data.properties.products['general-text'][0])
    }).render();
  },
  error: function () {
    document.querySelector('#text-product-view').innerHTML = [
      '<p class="alert error">',
        'Failed to load general-text product',
      '</p>'
    ].join('');
  }
});
