'use strict';


var LinkProductView = require('core/LinkProductView'),
    OafView = require('oaf/OafView'),
    ScientificSummaryModule = require('scientific/ScientificSummaryModule'),
    TextProductView = require('core/TextProductView'),
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

      _oafView,
      _subviews;


  options = Util.extend({}, _DEFAULTS, options);
  _this = Module(options);

  _initialize = function (/*options*/) {
    _this.ID = _ID;
    _this.TITLE = _TITLE;

    _subviews = [];
  };


  _this.destroy = Util.compose(function () {
    _this.destroyViews();

    _initialize = null;
    _this = null;
  }, _this.destroy);

  _this.destroyViews = function () {
    if (_oafView && _oafView.destroy) {
      _oafView.destroy();
    }

    if (_subviews) {
      _subviews.forEach(function (view) {
        if (view && view.destroy) {
          try { view.destroy(); } catch (e) { /* ignore */ }
        }
      });
    }

    _oafView = null;
    _subviews = null;
  };

  _this.getOafLinkViews = function () {
    var header,
        products,
        ul,
        wrapper;

    wrapper = document.createDocumentFragment();

    products = _this.getProducts('oaf-link');
    if (products.length) {
      header = wrapper.appendChild(document.createElement('h3'));
      ul = wrapper.appendChild(document.createElement('ul'));

      header.innerHTML = 'More Aftershock Information';

      products.forEach(function (product) {
        var view;

        view = LinkProductView({
          el: ul.appendChild(document.createElement('li')),
          model: product
        });

        view.render();

        _subviews.push(view);
      });
    }

    return wrapper;
  };

  _this.getOafTextViews = function () {
    var fragment,
        products;

    fragment = document.createDocumentFragment();
    products = _this.getProducts('oaf-header');

    products.forEach(function (product) {
      var view;

      view = TextProductView({
        model: product,
        el: fragment.appendChild(document.createElement('div'))
      });

      view.render();

      _subviews.push(view);
    });

    return fragment;
  };

  _this.render = function () {
    var product;

    _this.destroyViews();
    _subviews = [];

    _this.header.innerHTML = '';
    _this.content.innerHTML = '';
    _this.footer.innerHTML = '';

    product = _this.getProduct('oaf');

    if (product) {
      _this.renderHeader(product);
      _this.renderContent(product);
      _this.renderFooter(product);
    } else {
      _this.content.innerHTML = '<p class="alert info">' +
          'No aftershock forecast is available for this event.</p>';
    }
  };

  _this.renderContent = function (product) {
    if (product) {
      _oafView = OafView({
        catalogEvent: _this.model.get('event'),
        el: _this.content,
        model: product
      });

      _oafView.render();
    }
  };

  _this.renderFooter = function (product) {
    _this.footer.appendChild(_this.getOafLinkViews());

    if (product) {
      _this.footer.appendChild(_this.getProductFooter({
        product: product
      }));
    }
  };

  _this.renderHeader = function (product) {
    _this.header.innerHTML = '<h3>' + _this.TITLE + '</h3>';

    if (product) {
      _this.header.appendChild(_this.getProductHeader({
        product: product,
        summaryModule: ScientificSummaryModule
      }));
    }

    _this.header.appendChild(_this.getOafTextViews());
  };


  _initialize(options);
  options = null;
  return _this;
};


OafModule.ID = _ID;
OafModule.TITLE = _TITLE;
OafModule.TYPES = _TYPES;


module.exports = OafModule;
