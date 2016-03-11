'use strict';

var NearbyPlacesView = require('general/NearbyPlacesView'),
    Product = require('pdl/Product'),
    Xhr = require('util/Xhr');


Xhr.ajax({
  url: '/events/us10004u1y.json',
  success: function (data) {
    var product;

    product = Product(data.properties.products['nearby-cities'][0]);

    NearbyPlacesView({
      el: document.querySelector('#nearby-places-view-example'),
      model: product
    }).render();
  },
  error: function () {
    document.querySelector('#nearby-places-view-example').innerHTML = [
      '<p class="alert error">',
        'Failed to create a nearby places view.',
      '</p>'
    ].join('');
  }
});
