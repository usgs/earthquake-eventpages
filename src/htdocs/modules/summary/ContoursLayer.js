'use strict';

var AsynchronousGeoJSON = require('map/AsynchronousGeoJSON'),
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


var ContoursLayer = AsynchronousGeoJSON.extend({

  initialize: function (options) {
    AsynchronousGeoJSON.prototype.initialize.call(this,
        Util.extend({}, DEFAULTS, options));
  }

});


module.exports = ContoursLayer;
