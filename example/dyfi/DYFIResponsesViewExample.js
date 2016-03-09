'use strict';

var DYFIResponsesView = require('dyfi/DYFIResponsesView'),
    Product = require('pdl/Product'),
    Xhr = require('util/Xhr');

Xhr.ajax({
  url: '/events/us10004u1y.json',
  success: function (data) {
    var product, content;

    product = Product(data.properties.products.dyfi[0]);

    content = product.getContent('cdi_zip.xml');

    DYFIResponsesView({
      el: document.querySelector('#dyfiresponses-view-example'),
      model: product.getContent('cdi_zip.xml')
    }).render();
  },
  error: function () {
    document.querySelector('#dyfiresponses-view-example').innerHTML = [
      '<p class="alert error">',
        'Failed to create a DYFI Responses view.',
      '</p>'
    ].join('');
  }
});
