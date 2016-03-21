'use strict';

var PAGERView = require('losspager/PAGERView'),
    Product = require('pdl/Product'),
    Xhr = require('util/Xhr');


Xhr.ajax({
  url: '/events/us10004u1y.json',
  success: function (data) {
    var product;

    product = Product(data.properties.products['losspager'][0]);

    PAGERView({
      el: document.querySelector('#pager-view-example'),
      model: product
    }).render();
  },
  error: function (status, error) {
    console.log(status);
    console.log(error);
    document.querySelector('#pager-view-example').innerHTML = [
      '<p class="alert error">',
        'Failed to create pager view.',
      '</p>'
    ].join('');
  }
});
