/* global L */
'use strict';


var Formatter = require('core/Formatter'),
    Util = require('util/Util');

require('leaflet/layer/AsynchronousGeoJson');


var _DEFAULTS,
    _FORMATTER;

_DEFAULTS = {
  clickable: true,

  style: function (feature) {
    return {
      color: feature.properties.color,
      weight: feature.properties.weight,
      opacity: 1.0
    };
  },

  onEachFeature: function (feature, layer) {
    var roman;

    roman = _FORMATTER.mmi(feature.properties.value);

    if (this.clickable) {
      layer.bindPopup(
          '<div class="roman station-summary-intensity mmi' + roman + '">' +
            roman +
            '<br><abbr title="Modified Mercalli Intensity">mmi</abbr>' +
          '</div>');
    }
  }
};

_FORMATTER = Formatter();


var ContoursLayer = L.AsynchronousGeoJson.extend({

  initialize: function (options) {
    L.AsynchronousGeoJson.prototype.initialize.call(this,
        Util.extend({}, _DEFAULTS, options));
  }

});


L.ContoursLayer = ContoursLayer;

L.contoursLayer = function (options) {
  return new ContoursLayer(options);
};


module.exports = L.contoursLayer;
