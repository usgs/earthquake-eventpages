'use strict';

var GeoserveNearbyPlacesView = require('general/GeoserveNearbyPlacesView'),
    Product = require('pdl/Product'),
    Xhr = require('util/Xhr');


Xhr.ajax({
  url: '/events/us10004u1y.json',
  success: function (data) {
    var product;

    product = Product(data.properties.products.origin[0]);

    GeoserveNearbyPlacesView({
      el: document.querySelector('#geoserve-nearby-places-view-example'),
      model: product,
      eventConfig: {
        'GEOSERVE_WS_URL': 'https://earthquake.usgs.gov/ws/geoserve/places.json'
      }
    }).render();
  },
  error: function () {
    document.querySelector('#geoserve-nearby-places-view-example').innerHTML = [
      '<p class="alert error">',
        'Failed to create a geoserve nearby places view.',
      '</p>'
    ].join('');
  }
});
