'use strict';

var DownloadView = require('general/DownloadView'),
    Product = require('pdl/Product'),
    Xhr = require('util/Xhr');

Xhr.ajax({
  url: '/event/us10004u1y.json',
  success: function (data) {
    DownloadView({
      el: document.querySelector('#download-view-example'),
      model: Product(data.properties.products.shakemap[0])
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
