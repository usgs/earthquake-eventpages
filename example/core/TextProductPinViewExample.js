'use strict';


var TextProductPinView = require('core/TextProductPinView'),
    Product = require('pdl/Product'),
    Xhr = require('util/Xhr');

// 'general-text'
Xhr.ajax({
  url: '/events/us10004u1y.json',
  success: function (data) {
    var product;

    product = Product(data.properties.products['general-text'][0]);

    TextProductPinView({
      el: document.querySelector('.text-product-pin-view-example-general-text'),
      model: product,
      module: {ID: 'general-text', TITLE: 'General Text'}
    }).render();
  },
  error: function () {
    document.querySelector('.text-product-pin-view-example-general-text').innerHTML = [
      '<p class="alert error">',
        'Failed to create a TextProductPinView.',
      '</p>'
    ].join('');
  }
});


// 'impact-text'
Xhr.ajax({
  url: '/events/ci37528064.json',
  success: function (data) {
    var product;

    product = Product(data.properties.products['impact-text'][0]);

    TextProductPinView({
      el: document.querySelector('.text-product-pin-view-example-impact-text'),
      model: product,
      module: {ID: 'impact-text', TITLE: 'Impact Text'}
    }).render();
  },
  error: function () {
    document.querySelector('.text-product-pin-view-example-impact-text').innerHTML = [
      '<p class="alert error">',
        'Failed to create a TextProductPinView.',
      '</p>'
    ].join('');
  }
});



// 'scitech-text'
Xhr.ajax({
  url: '/events/usp000hvnu.json',
  success: function (data) {
    var product;

    product = Product(data.properties.products['scitech-text'][0]);

    TextProductPinView({
      el: document.querySelector('.text-product-pin-view-example-scitech-text'),
      model: product,
      module: {ID: 'scitech-text', TITLE: 'Scitech Text'}
    }).render();
  },
  error: function () {
    document.querySelector('.text-product-pin-view-example-scitech-text').innerHTML = [
      '<p class="alert error">',
        'Failed to create a TextProductPinView.',
      '</p>'
    ].join('');
  }
});


