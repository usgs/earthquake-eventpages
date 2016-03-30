'use strict';

var OriginView = require('origin/OriginView'),
    Product = require('pdl/Product'),
    Xhr = require('util/Xhr');

Xhr.ajax({
  url: '/events/us10004u1y.json',
  success: function (data) {
    var geoserve,
        product;

    product = Product(data.properties.products['phase-data'][0]);
    geoserve = Product(data.properties.products.geoserve[0]);
    product.setProperty({
      'geoserve': geoserve
    });

    OriginView({
      el: document.querySelector('#origin-view-example'),
      model: product,
      eventConfig: {
        'GEOSERVE_WS_URL': 'http://earthquake.usgs.gov/ws/geoserve/'
      }
    }).render();
  },
  error: function () {
    document.querySelector('#origin-view-example').innerHTML = [
      '<p class="alert error">',
        'Failed to create a Origin view.',
      '</p>'
    ].join('');
  }
});
