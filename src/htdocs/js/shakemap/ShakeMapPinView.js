'use strict';

var BasicPinView = require('core/BasicPinView'),
    Util = require('util/Util');


var ShakeMapPinView = function (options) {
  var _this;

  options = Util.extend({}, options);
  _this = BasicPinView(options);

  /**
   * Renders content for ShakeMapPinView
   */
  _this.renderPinContent = function () {
    var intensityMap,
        maxmmi;

    intensityMap = _this.model.getContent('download/intensity.jpg');
    maxmmi = _this.model.get('properties').maxmmi;

    _this.content.innerHTML =
      '<div class="shakemap-pin-badge" title="ShakeMap MMI">' +
        '<strong class="shakemap-mmi">' +
          maxmmi +
        '</strong>' +
        '<br />' +
        '<abbr class="shakemap-max-mmi" ' +
            'title="Max Modified Mercalli Intensity">' +
          'Max MMI' +
        '</abbr>' +
      '</div>' +
      '<div class="shakemap-map">' +
        '<img src="' + intensityMap.get('url') + '" />' +
      '</div>';
  };


  options = null;
  return _this;
};


module.exports = ShakeMapPinView;
