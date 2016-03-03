'use strict';

var Module = require('core/Module'),
    Util = require('util/Util');

var _ID,
    _TITLE,

    _hasContent;


// Note: These should be overridden by each implementing sub-class.
_ID = 'general';
_TITLE = 'General';

_hasContent = function (eventPageModel) {
  var ev;

  ev = eventPageModel.get('event');
  if (ev !== null) {
    // only show this module if there is an event
    return true;
  }

  return false;
};

var _DEFAULTS = {

};


var GeneralSummaryModule = function (options) {
  var _this,
      _initialize,

      _generalLinkEl,
      _generalTextEl,
      _locationEl,
      _nearbyPlacesEl,
      _tectonicSummaryEl,
      _timeEl,

      _renderGeneralLink,
      _renderGeneralText,
      _renderLocation,
      _renderNearbyPlaces,
      _renderTectonicSummary,
      _renderTime;


  options = Util.extend({}, _DEFAULTS, options);
  _this = Module(options);

  _initialize = function (/*options*/) {
    _this.ID = _ID;
  };

  _this.render = function () {
    var el;

    el = _this.el;
    el.innerHTML = [
      '<pre>',
        JSON.stringify(_this.model.get(_ID), null, 2),
      '</pre>',
      '<div class="module-content">',
        '<div class="row">',
          '<div class="column one-of-two">',
            '<div class="location"></div>',
          '</div>',
          '<div class="column one-of-two">',
            '<div class="time"></div>',
            '<div class="nearby-places"></div>',
          '</div>',
        '</div>',
        '<div class="general-text"></div>',
        '<div class="tectonic-summary"></div>',
        '<div class="general-link"></div>',
      '</div>',
    ].join('');

    _locationEl = el.querySelector('.location');
    _timeEl = el.querySelector('.time');
    _nearbyPlacesEl = el.querySelector('.nearby-places');
    _generalTextEl = el.querySelector('.general-text');
    _tectonicSummaryEl = el.querySelector('.tectonic-summary');
    _generalLinkEl = el.querySelector('.general-link');

    _renderLocation();
    _renderTime();
    _renderNearbyPlaces();
    _renderGeneralText();
    _renderTectonicSummary();
    _renderGeneralLink();
  };

  _this.destroy = Util.compose(function () {
    _this = null;
    _initialize = null;

    _generalLinkEl = null;
    _generalTextEl = null;
    _locationEl = null;
    _nearbyPlacesEl = null;
    _tectonicSummaryEl = null;
    _timeEl = null;

    _renderGeneralLink = null;
    _renderGeneralText = null;
    _renderLocation = null;
    _renderNearbyPlaces = null;
    _renderTectonicSummary = null;
    _renderTime = null;
  }, _this.destroy);

  _renderGeneralLink = function () {
    _generalLinkEl.innerHTML = '<h3>For More Information</h3>';
  };

  _renderGeneralText = function () {
    _generalTextEl.innerHTML = '<h3>General Text</h3>';
  };

  _renderLocation = function () {
    _locationEl.innerHTML = '<h3>Location</h3>';
  };

  _renderNearbyPlaces = function () {
    _nearbyPlacesEl.innerHTML = '<h3>Nearby Places</h3>';
  };

  _renderTectonicSummary = function () {
    _tectonicSummaryEl.innerHTML = '<h3>Tectonic Summary</h3>';
  };

  _renderTime = function() {
    _timeEl.innerHTML = '<h3>Time</h3>';
  };


  _initialize(options);
  options = null;
  return _this;
};


GeneralSummaryModule.ID = _ID;
GeneralSummaryModule.TITLE = _TITLE;

GeneralSummaryModule.hasContent = _hasContent;


module.exports = GeneralSummaryModule;
