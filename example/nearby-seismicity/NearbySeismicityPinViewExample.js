'use strict';

var NearbySeismicityPinView = require('nearby-seismicity/NearbySeismicityPinView'),
    CatalogEvent = require('pdl/CatalogEvent'),
    Xhr = require('util/Xhr');

Xhr.ajax({
  url: '/events/us10004u1y.json',
  success: function (data) {
    var ev;

    ev = CatalogEvent(data);

    NearbySeismicityPinView({
      el: document.querySelector('.nearby-seismicity-pin-view-example'),
      event: ev,
      module: {TITLE: 'View Nearby Seismicity'}
    }).render();
  },
  error: function () {
    document.querySelector('.nearby-seismicity-pin-view-example').innerHTML = [
      '<p class="alert error">',
        'Failed to create a Nearby Seismicity pin.',
      '</p>'
    ].join('');
  }
});
