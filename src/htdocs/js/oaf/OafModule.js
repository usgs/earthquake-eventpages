'use strict';


var OafView = require('oaf/OafView'),
    ScientificSummaryModule = require('scientific/ScientificSummaryModule'),
    Util = require('util/Util'),
    Module = require('core/Module');


var _DEFAULTS,
    _ID,
    _TITLE,
    _TYPES;

_ID = 'oaf';
_TITLE = 'Aftershock Forecast';
_TYPES = ['oaf'];

_DEFAULTS = {

};


var OafModule = function (options) {
  var _this,
      _initialize,

      _oafView;


  options = Util.extend({}, _DEFAULTS, options);
  _this = Module(options);

  _initialize = function (/*options*/) {
    _this.ID = _ID;
    _this.TITLE = _TITLE;
  };


  _this.destroy = Util.compose(function () {
    _this.destroyView();

    _initialize = null;
    _this = null;
  }, _this.destroy);

  _this.destroyView = function () {
    if (_oafView && _oafView.destroy) {
      _oafView.destroy();
    }

    _oafView = null;
  };

  _this.render = function () {
    _this.renderHeader();
    _this.renderContent();
    _this.renderFooter();
  };

  _this.renderContent = function () {
    var product;

    product = _this.getProduct('oaf');

    _this.destroyView();

    if (!product) {
      _this.content.innerHTML = '<p class="alert error">No OAF found!</p>';
    } else {
      _oafView = OafView({
        catalogEvent: _this.model.get('event'),
        el: _this.content,
        model: product
      });

      _oafView.render();
    }
  };

  _this.renderFooter = function () {
    _this.footer.innerHTML = '<p class="alert warning">' +
        'TODO :: Links to more resources.</p>';
  };

  _this.renderHeader = function () {
    _this.header.innerHTML = '<h3>' + _this.TITLE + '</h3>';

    _this.header.appendChild(_this.getProductHeader({
      product: _this.getProduct('oaf'),
      summaryModule: ScientificSummaryModule
    }));
  };


  _initialize(options);
  options = null;
  return _this;
};


OafModule.ID = _ID;
OafModule.TITLE = _TITLE;
OafModule.TYPES = _TYPES;


module.exports = OafModule;
