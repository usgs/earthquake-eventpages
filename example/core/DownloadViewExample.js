'use strict';

var DownloadView = require('core/DownloadView'),
    Product = require('pdl/Product'),
    Xhr = require('util/Xhr');

Xhr.ajax({
  url: '/events/us10004u1y.json',
  success: function (data) {
    var product;

    product = Product(data.properties.products.shakemap[0]);

    DownloadView({
      el: document.querySelector('#download-view-example'),
      model: product.getContent('contents.xml'),
      product: product
    }).render();
  },
  error: function () {
    document.querySelector('#download-view-example').innerHTML = [
      '<p class="alert error">',
        'Failed to create a download view.',
      '</p>'
    ].join('');
  }
});
