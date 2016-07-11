'use strict';

var CatalogEvent = require('pdl/CatalogEvent'),
    RegionalInfoPinView = require('general/RegionalInfoPinView'),
    Model = require('mvc/Model'),
    Xhr = require('util/Xhr');

Xhr.ajax({
  url: '/events/us10004u1y_orig.json',
  success: function (data) {

    RegionalInfoPinView({
      el: document.querySelector('.regional-info-pin-view-example'),
      model: Model({
        'event': CatalogEvent(data),
        'config': {}
      })
    }).render();
  },
  error: function () {
    document.querySelector('.regional-info-pin-view-example').innerHTML = [
      '<p class="alert error">',
        'Failed to create Regional Info Pin view.',
      '</p>'
    ].join('');
  }
});
