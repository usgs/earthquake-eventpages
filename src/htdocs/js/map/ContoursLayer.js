/* global L */
'use strict';


var AsynchronousGeoJson = require('map/AsynchronousGeoJson'),
    ImpactUtil = require('base/ImpactUtil'),
    Util = require('util/Util');


var DEFAULTS = {
  style: function (feature) {
    return {
      color: feature.properties.color,
      weight: feature.properties.weight,
      opacity: 1.0
    };
  },

  onEachFeature: function (feature, layer) {
    var roman = ImpactUtil.translateMmi(feature.properties.value);

    layer.bindPopup(
        '<div class="roman station-summary-intensity mmi' + roman + '">' +
          roman +
          '<br><abbr title="Modified Mercalli Intensity">mmi</abbr>' +
        '</div>');
  }
};


var ContoursLayer = AsynchronousGeoJson.extend({

  initialize: function (options) {
    AsynchronousGeoJson.prototype.initialize.call(this,
        Util.extend({}, DEFAULTS, options));
  }

});


L.ContoursLayer = ContoursLayer;

L.contoursLayer = function (options) {
  return new ContoursLayer(options);
};


module.exports = L.contoursLayer;
