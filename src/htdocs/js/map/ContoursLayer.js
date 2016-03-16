/* global L */
'use strict';


var ImpactUtil = require('base/ImpactUtil'),
    Util = require('util/Util');

require('map/AsynchronousGeoJson');


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


var ContoursLayer = L.AsynchronousGeoJson.extend({

  initialize: function (options) {
    L.AsynchronousGeoJson.prototype.initialize.call(this,
        Util.extend({}, DEFAULTS, options));
  }

});


L.ContoursLayer = ContoursLayer;

L.contoursLayer = function (options) {
  return new ContoursLayer(options);
};


module.exports = L.contoursLayer;
