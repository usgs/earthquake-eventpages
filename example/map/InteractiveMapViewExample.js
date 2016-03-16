'use strict';

var CatalogEvent = require('pdl/CatalogEvent'),
    Model = require('mvc/Model'),
    InteractiveMapView = require('map/InteractiveMapView'),
    Xhr = require('util/Xhr');

Xhr.ajax({
  url: '/events/us10004u1y.json',
  success: function (data) {
    InteractiveMapView({
      el: document.querySelector('#interactivemap-view-example'),
      model: Model({
        'event': CatalogEvent(data),
        'config': {}
      })
    }).render();
  },
  error: function () {
    document.querySelector('#interactivemap-view-example').innerHTML = [
      '<p class="alert error">',
        'Failed to create a InteractiveMap view.',
      '</p>'
    ].join('');
  }
});
