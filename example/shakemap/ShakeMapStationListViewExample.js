'use strict';

var ShakeMapStationListView = require('shakemap/ShakeMapStationListView'),
    Product = require('pdl/Product'),
    Xhr = require('util/Xhr');

Xhr.ajax({
  url: '/events/us10004u1y.json',
  success: function (data) {
    ShakeMapStationListView({
      el: document.querySelector('#shakemapstationlist-view-example'),
      model: Product(data.properties.products.shakemap[0])
    }).render();
  },
  error: function () {
    document.querySelector('#shakemapstationlist-view-example').innerHTML = [
      '<p class="alert error">',
        'Failed to create a shakemap station list view.',
      '</p>'
    ].join('');
  }
});
