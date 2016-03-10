'use strict';

var GeoserveNearbyPlacesView = require('general/GeoserveNearbyPlacesView'),
    Content = require('pdl/Content'),
    Xhr = require('util/Xhr');

var geoserveUrl;
geoserveUrl = 'http://earthquake.usgs.gov/ws/geoserve/places.json?latitude=39.75&longitude=-105.2&type=event';

var geoserveNearbyPlacesView = GeoserveNearbyPlacesView({
  el: document.querySelector('#geoserve-nearby-places-view-example'),
  model: Content({
    url: geoserveUrl
  })
});

geoserveNearbyPlacesView.render();
