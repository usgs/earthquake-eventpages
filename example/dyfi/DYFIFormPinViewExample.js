'use strict';


var DYFIFormPinView = require('dyfi/DYFIFormPinView'),
    Product = require('pdl/Product'),
    Xhr = require('util/Xhr');


// 'dyfi'
Xhr.ajax({
  url: '/events/us10004u1y.json',
  success: function (data) {
    var product;

    product = Product(data.properties.products.dyfi[0]);

    DYFIFormPinView({
      el: document.querySelector('.dyfi-form-pin-view-example'),
      model: product
    }).render();
  },
  error: function (e) {
    console.log(e);
    document.querySelector('.dyfi-form-pin-view-example').innerHTML = [
      '<p class="alert error">',
        'Failed to create a DYFIFormPinView.',
      '</p>'
    ].join('');
  }
});
