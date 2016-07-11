'use strict';

var RegionalInfoPinView = require('general/RegionalInfoPinView'),
    Product = require('pdl/Product'),
    Xhr = require('util/Xhr');

Xhr.ajax({
  url: '/events/us10004u1y_orig.json',
  success: function (data) {
    var product;

    product = Product(data.properties.products['phase-data'][0]);

    RegionalInfoPinView({
      el: document.querySelector('.regional-info-pin-view-example'),
      model: product
    }).render();
  },
  error: function (e) {
    console.log(e);
    document.querySelector('.regional-info-pin-view-example').innerHTML = [
      '<p class="alert error">',
        'Failed to create Regional Info Pin view.',
      '</p>'
    ].join('');
  }
});
