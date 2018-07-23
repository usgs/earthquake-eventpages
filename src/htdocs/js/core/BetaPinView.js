'use strict';

var BasicPinView = require('core/BasicPinView'),
    Util = require('util/Util');

var _DEFAULTS;

_DEFAULTS = {
  module: {TITLE: 'BETA Preview'}
};

/**
 * A pin view that links to the beta event pages
 */
var BetaPinView = function (options) {
  var _this,
      _initialize;

  options = Util.extend({}, _DEFAULTS, options);
  _this = BasicPinView(options);

  _initialize = function (options) {
    _this.eventId = options.eventId;
    _this.el.classList.add('beta-pin-view');
  };

  _this.destroy = Util.compose(function () {
    if (_this === null) {
      return;
    }

    _initialize = null;
    _this = null;
  }, _this.destroy);

  _this.getLinkUrl = function () {
    return '/beta/earthquakes/eventpage/' + _this.eventId;
  };

  _this.renderPinContent = function () {
    _this.content.innerHTML = [
      '<p class="alert info beta-pin-view-announcement">',
        'Preview this event in the new BETA version of the pages.',
      '</p>'
    ].join('');
  };

  _this.renderPinFooter = function () {
    _this.footer.innerHTML = [
      'Hazards Development Team'
    ].join('');
  };

  _initialize(options);
  options = null;
  return _this;
};

module.exports = BetaPinView;
