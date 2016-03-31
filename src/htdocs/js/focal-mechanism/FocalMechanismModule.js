'use strict';


var Formatter = require('core/Formatter'),
    Module = require('core/Module'),
    FocalMechanismView = require('focal-mechanism/FocalMechanismView'),
    ScientificSummaryModule = require('scientific/ScientificSummaryModule'),
    Util = require('util/Util');


var _DEFAULTS,
    _ID,
    _TITLE,
    _TYPES;


_ID = 'focal-mechanism';
_TITLE = 'Focal Mechanism';
_TYPES = ['focal-mechanism'];

_DEFAULTS = {
  formatter: null
};


/**
 * Module to display a focal-mechanism type {Product}.
 *
 * @param options {Object}
 * @param options.formatter {Formatter}
 *     formatter object to pass to FocalMechanismView.
 */
var FocalMechanismModule = function (options) {
  var _this,
      _initialize,

      _formatter,
      _focalMechanismView;


  _this = Module(options);

  _initialize = function (options) {
    options = Util.extend({}, _DEFAULTS, options);
    _formatter = options.formatter || Formatter();

    _this.ID = _ID;
    _this.TITLE = _TITLE;
  };

  /**
   * Free references.
   */
  _this.destroy = Util.compose(function () {
    if (_focalMechanismView) {
      _focalMechanismView.destroy();
    }
    _focalMechanismView = null;

    _formatter = null;
    _initialize = null;
    _this = null;
  }, _this.destroy);

  /**
   * Render product content, or an error message if no product available.
   */
  _this.render = function () {
    var product;

    product = _this.getProduct('focal-mechanism');

    _this.renderHeader(product);
    _this.renderContent(product);
    _this.renderFooter(product);
  };

  /**
   * Render the content section of this module.
   *
   * @param product {Product}
   *     product to render, or null if no product.
   */
  _this.renderContent = function (product) {
    if (_focalMechanismView && _focalMechanismView.destroy) {
      _focalMechanismView.destroy();
      _focalMechanismView = null;
    }

    if (!product) {
      _this.content.innerHTML = '<p class="alert error">' +
          'No Focal Mechanism Found!' +
          '</p>';
    } else {
      _focalMechanismView = FocalMechanismView({
        el: _this.content,
        formatter: _formatter,
        model: product
      });
      _focalMechanismView.render();
    }
  };

  /**
   * Render the footer section of this module.
   *
   * @param product {Product}
   *     product to render, or null if no product.
   */
  _this.renderFooter = function (product) {
    var downloads;

    Util.empty(_this.footer);
    if (product) {
      downloads = _this.getProductFooter({
        product: product
      });
      if (downloads) {
        _this.footer.appendChild(downloads);
      }
    }
  };

  /**
   * Render the header section of this module.
   *
   * @param product {Product}
   *     product to render, or null if no product.
   */
  _this.renderHeader = function (product) {
    var header;

    Util.empty(_this.header);
    _this.header.innerHTML = '<h3>' + _this.TITLE + '</h3>';

    if (product) {
      header = _this.getProductHeader({
        product: product,
        summaryModule: ScientificSummaryModule
      });

      if (header) {
        _this.header.appendChild(header);
      }
    }
  };


  _initialize(options);
  options = null;
  return _this;
};


FocalMechanismModule.ID = _ID;
FocalMechanismModule.TITLE = _TITLE;
FocalMechanismModule.TYPES = _TYPES;


module.exports = FocalMechanismModule;
