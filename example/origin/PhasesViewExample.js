'use strict';

var PhasesView = require('origin/PhasesView'),
    Product = require('pdl/Product'),
    Xhr = require('util/Xhr');

Xhr.ajax({
  url: '/events/ci37528064.json',
  success: function (data) {
    var content,
        product;

    product = Product(data.properties.products['phase-data'][0]);
    content = product.getContent('quakeml.xml');

    PhasesView({
      el: document.querySelector('#phases-view-example'),
      model: content,
      product: product
    }).render();
  },
  error: function () {
    document.querySelector('#phases-view-example').innerHTML = [
      '<p class="alert error">',
        'Failed to create a Phases view.',
      '</p>'
    ].join('');
  }
});
