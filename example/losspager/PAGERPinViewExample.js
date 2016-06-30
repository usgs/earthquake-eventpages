'use strict';


var PAGERPinView = require('losspager/PAGERPinView'),
    Product = require('pdl/Product'),
    Xhr = require('util/Xhr');


// 'losspager'
Xhr.ajax({
  url: '/events/us10004u1y.json',
  success: function (data) {
    var product;

    product = Product(data.properties.products.losspager[0]);

    PAGERPinView({
      el: document.querySelector('.losspager-pin-view-example'),
      model: product
    }).render();
  },
  error: function (e) {
    console.log(e);
    document.querySelector('.losspager-pin-view-example').innerHTML = [
      '<p class="alert error">',
        'Failed to create a PAGERPinView.',
      '</p>'
    ].join('');
  }
});
