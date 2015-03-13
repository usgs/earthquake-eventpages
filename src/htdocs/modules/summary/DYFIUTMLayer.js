'use strict';

var AsynchronousGeoJSON = require('map/AsynchronousGeoJSON'),
    Formatter = require('base/Formatter'),
    ImpactUtil = require('base/ImpactUtil'),
    Util = require('util/Util');


var DEFAULT_FORMATTER = new Formatter();

var DEFAULT_OPTIONS = {
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
    layer.options.title = feature.properties.name;
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
          '<br><abbr title="Community Determined Intensity">cdi</abbr></br>' +
        '</li>' +
        '<li class="dyfi-summary-nresp">' +
          DEFAULT_FORMATTER.number(p.nresp, 0, '&ndash;') +
          '<br><abbr title="Number of Responses">responses</abbr></br>' +
        '</li>' +
        '<li class="dyfi-summary-distance">' +
          DEFAULT_FORMATTER.number(p.dist, 1, '&ndash;', 'km') +
          '<br><abbr title="Distance from Epicenter in">distance</abbr></br>' +
        '</li>' +
      '</ul>' +
    '</div>';
  }
};


var DYFIUTMLayer = AsynchronousGeoJSON.extend({

  initialize: function (options) {
    AsynchronousGeoJSON.prototype.initialize.call(this,
        Util.extend({}, DEFAULT_OPTIONS, options));
  }

});


module.exports = DYFIUTMLayer;
