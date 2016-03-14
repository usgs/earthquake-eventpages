'use strict';

var PAGERView = require('general/PAGERView'),
    Product = require('pdl/Product'),
    Xhr = require('util/Xhr');


Xhr.ajax({
  url: 'TODO: set up url',
  success: function (data) {
    var product;

    product = /*this needs to be changed*/Product(data.properties.products['nearby-cities'][0]);

    PAGERView({
      el: document.querySelector('#pager-view-example'),
      model: product
    }).render();
  },
  error: function () {
    document.querySelector('#pager-view-example').innerHTML = [
      '<p class="alert error">',
        'Failed to create pager view.',
      '</p>'
    ].join('');
  }
});
