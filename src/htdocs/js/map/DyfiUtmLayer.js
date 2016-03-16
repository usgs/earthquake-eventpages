/* global L */
'use strict';

var AsynchronousGeoJson = require('leaflet/layer/AsynchronousGeoJson'),
    Formatter = require('core/Formatter'),
    ImpactUtil = require('base/ImpactUtil'),
    Util = require('util/Util');


var _DEFAULT_FORMATTER = Formatter();

var _DEFAULT_OPTIONS = {
  style: function (feature) {
    var color = ImpactUtil.getMmiColor(feature.properties.cdi);
    return {
      color: '#999',
      fillColor: color,
      fillOpacity: 0.9,
      opacity: 0.9,
      weight: 0.5
    };
  },

  onEachFeature: function (feature, layer) {
    layer.bindPopup(this.formatPopup(feature));
  },

  formatPopup: function (feature) {
    var p = feature.properties,
        mmi = ImpactUtil.translateMmi(p.cdi);

    return '<div class="dyfi-popup">' +
      '<h2 class="dyfi-name">' + p.name + '</h2>' +
      '<ul class="dyfi-summary">' +
        '<li class="dyfi-summary-intensity roman mmi' + mmi + '">' +
          mmi +
          '<br/><abbr title="Community Determined Intensity">cdi</abbr>' +
        '</li>' +
        '<li class="dyfi-summary-nresp">' +
          _DEFAULT_FORMATTER.number(p.nresp, 0, '&ndash;') +
          '<br/><abbr title="Number of Responses">responses</abbr>' +
        '</li>' +
        '<li class="dyfi-summary-distance">' +
          _DEFAULT_FORMATTER.number(p.dist, 1, '&ndash;', 'km') +
          '<br/><abbr title="Distance from Hypocenter">distance</abbr>' +
        '</li>' +
      '</ul>' +
    '</div>';
  }
};


var DyfiUtmLayer = AsynchronousGeoJson.extend({

  initialize: function (options) {
    AsynchronousGeoJson.prototype.initialize.call(this,
        Util.extend({}, _DEFAULT_OPTIONS, options));
  }

});


L.DyfiUtmLayer = DyfiUtmLayer;

L.dyfiUtmLayer = function (options) {
  return new DyfiUtmLayer(options);
};


module.exports = L.dyfiUtmLayer;
