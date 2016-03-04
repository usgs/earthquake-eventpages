'use strict';

var ProductView = require('core/ProductView'),
    Util = require('util/Util');


var _DEFAULTS = {};


/**
 * Class info and constructor parameters.
 */
var LocationView = function (options) {
  var _this,
      _initialize,

      _getLocationCaption,
      _getLocationMap;


  _this = ProductView(options);

  _initialize = function (options) {
    options = Util.extend({}, _DEFAULTS, options);
  };


  _this.render = function () {
    var el;

    el = _this.el;
    el.innerHTML = '<h3>Location</h3>' +
        '<small class="attribution"></small>' +
        '<figure class="summary-map">' +
          '<a href="#interactivemap">' +
            _getLocationMap() +
          '</a>' +
          '<figcaption>' +
            _getLocationCaption() +
          '</figcaption>' +
        '</figure>';
  };


  _getLocationMap = function () {
    // TODO: use actual map
    return '<span>MAP GOES HERE</span>';
  };

  _getLocationCaption = function () {
    var depth,
        latitude,
        longitude,
        properties;

    properties = _this.model.get('properties');
    depth = properties.depth || null;
    latitude = properties.latitude || null;
    longitude = properties.longitude || null;

    // TODO: use formatter
    return latitude + ', ' + longitude +
        ' depth=' + depth + ' km' +
        '<br/><a href="#interactivemap">View interactive map</a>';
  };


  _initialize(options);
  options = null;
  return _this;
};


module.exports = LocationView;
