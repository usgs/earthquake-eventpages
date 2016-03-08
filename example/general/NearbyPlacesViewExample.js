'use strict';

var NearbyPlacesView = require('general/NearbyPlacesView'),
    Content = require('pdl/Content'),
    Xhr = require('util/Xhr');

Xhr.ajax({
  url: '/events/us10004u1y.json',
  success: function (data) {
    var content;

    content = Content(data.properties.products['nearby-cities'][0].contents['nearby-cities.json']);

    NearbyPlacesView({
      el: document.querySelector('#nearby-places-view-example'),
      model: content
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
