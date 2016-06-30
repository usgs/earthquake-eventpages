'use strict';

var CatalogEvent = require('pdl/CatalogEvent'),
    InteractiveMapPinView = require('map/InteractiveMapPinView'),
    Model = require('mvc/Model'),
    Xhr = require('util/Xhr');

Xhr.ajax({
  url: '/events/us10004u1y_orig.json',
  success: function (data) {

    InteractiveMapPinView({
      el: document.querySelector('.map-pin-view-example'),
      model: Model({
        'event': CatalogEvent(data),
        'config': {}
      })
    }).render();
  },
  error: function () {
    document.querySelector('.map-pin-view-example').innerHTML = [
      '<p class="alert error">',
        'Failed to create Map Pin view.',
      '</p>'
    ].join('');
  }
});




