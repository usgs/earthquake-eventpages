'use strict';

var BasicPinView = require('core/BasicPinView'),
    InteractiveMapView = require('map/InteractiveMapView'),
    Module = require('core/Module'),
    Util = require('util/Util');

var _DEFAULTS = {
  module: {ID: 'map', TITLE: 'Interactive Map'}
};

var MapPinView = function (options) {
  var _this,
      _initialize,

      _mapView;

  options = Util.extend({}, _DEFAULTS, options);

  _this = BasicPinView(options);

  _initialize = function (options) {
    var buf,
        el;

    _this.module = options.module;
    _this.model.set({'map':{'ShakeMap MMI Contours':false}}, {'silent':true});

    buf = [];
    buf.push(
      '<figure>' +
        '<a href="#map" class="locationview-map">' +
          '<div></div>' +
        '</a>' +
      '</figure>'
      );

    el = document.createElement('div');
    el.classList.add('location-view');
    el.innerHTML = buf.join('');

    _this.content.appendChild(el);

    _mapView = InteractiveMapView({
      el: el.querySelector('.locationview-map > div'),
      interactive: false,
      model: _this.model,
      module: Module(),
      scaleControl: false
    });
    _mapView.el.addEventListener('click', _this.onClick);
  };

  _this.destroy = Util.compose(function () {
    if (_this === null) {
      return;
    }
    _mapView.el.removeEventListerner('click', _this.onClick);
    _mapView.destroy();
    _this = null;
  }, _this.destroy);

  _this.onClick = function () {
    window.location = '#map';
  };

  _this.renderPinContent = function () {
    _mapView.render();
  };

  _this.renderPinFooter = function () {

  };

  _initialize(options);
  options = null;
  return _this;
};

module.exports = MapPinView;
