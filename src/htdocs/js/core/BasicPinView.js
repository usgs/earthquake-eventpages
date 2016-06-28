'use strict';


var Attribution = require('core/Attribution'),
    Util = require('util/Util'),
    View = require('mvc/View');


var _DEFAULTS = {
  module: {ID: '', TITLE: 'Module Title'}
};


var BasicPinView = function (options) {
  var _this,
      _initialize;


  options = Util.extend({}, _DEFAULTS, options);
  _this = View(options);

  _initialize = function (options) {
    _this.module = options.module;

    _this.el.innerHTML = [
      '<section class="pin-view">',
        '<header class="pin-header"></header>',
        '<div class="pin-content"></div>',
        '<footer class="pin-footer"></footer>',
      '</section>'
    ].join('');

    _this.header = _this.el.querySelector('.pin-header');
    _this.content = _this.el.querySelector('.pin-content');
    _this.footer = _this.el.querySelector('.pin-footer');
  };


  _this.destroy = Util.compose(function () {
    _initialize = null;
    _this = null;
  }, _this.destroy);

  _this.render = function () {
    _this.renderPinHeader();
    _this.renderPinContent();
    _this.renderPinFooter();

    return _this;
  };

  _this.renderPinContent = function () {
    _this.content.innerHTML = 'Pin Content';
  };

  _this.renderPinFooter = function () {
    _this.footer.innerHTML = 'Contributed by ' +
        Attribution.getProductAttribution(_this.model);
  };

  _this.renderPinHeader = function () {
    var fragment,
        display;

    fragment = _this.module.ID;
    display = _this.module.TITLE;

    _this.header.innerHTML = [
      '<a href="#', fragment, '">', display, '</a>'
    ].join('');
  };


  _initialize(options);
  options = null;
  return _this;
};


module.exports = BasicPinView;
