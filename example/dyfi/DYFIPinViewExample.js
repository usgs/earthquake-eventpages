'use strict';


var DYFIPinVIew = require('dyfi/DYFIPinView'),
    Product = require('pdl/Product'),
    Xhr = require('util/Xhr');


// 'dyfi'
Xhr.ajax({
  url: '/events/us10004u1y.json',
  success: function (data) {
    var product;

    product = Product(data.properties.products.dyfi[0]);

    DYFIPinVIew({
      el: document.querySelector('.dyfi-pin-view-example'),
      model: product
    }).render();
  },
  error: function (e) {
    console.log(e);
    document.querySelector('.dyfi-pin-view-example').innerHTML = [
      '<p class="alert error">',
        'Failed to create a DYFIPinVIew.',
      '</p>'
    ].join('');
  }
});
