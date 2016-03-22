'use strict';

var FocalMechanismView = require('focal-mechanism/FocalMechanismView'),
    Product = require('pdl/Product'),
    Xhr = require('util/Xhr');

Xhr.ajax({
  url: '/events/nn00536452.json',
  success: function (data) {
    var product;

    product = Product(data.properties.products['focal-mechanism'][0]);

    FocalMechanismView({
      el: document.querySelector('#focalmechanismview-example'),
      model: product
    }).render();
  },
  error: function (e) {
    document.querySelector('#focalmechanismview-example').innerHTML = [
      '<p class="alert error">',
        'Failed to create a focal mechanism view.',
      '</p>'
    ].join('');
    throw e;
  }
});
