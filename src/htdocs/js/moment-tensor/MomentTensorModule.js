'use strict';


var Formatter = require('core/Formatter'),
    Module = require('core/Module'),
    MomentTensorView = require('moment-tensor/MomentTensorView'),
    // TODO: import actual ScientificSummaryModule once implemented
    ScientificSummaryModule = require('general/GeneralSummaryModule'),
    Util = require('util/Util');


var _DEFAULTS,
    _ID,
    _TITLE,
    _TYPES;


_ID = 'moment-tensor';
_TITLE = 'Moment Tensor';
_TYPES = ['moment-tensor'];

_DEFAULTS = {
  formatter: null
};


/**
 * Module to display a moment-tensor type {Product}.
 *
 * @param options {Object}
 * @param options.formatter {Formatter}
 *     formatter object to pass to MomentTensorView.
 */
var MomentTensorModule = function (options) {
  var _this,
      _initialize,

      _formatter,
      _momentTensorView;


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
    if (_momentTensorView) {
      _momentTensorView.destroy();
    }
    _momentTensorView = null;

    _formatter = null;
    _initialize = null;
    _this = null;
  }, _this.destroy);

  /**
   * Render product content, or an error message if no product available.
   */
  _this.render = function () {
    var product;

    product = _this.getProduct('moment-tensor');

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
    if (_momentTensorView && _momentTensorView.destroy) {
      _momentTensorView.destroy();
      _momentTensorView = null;
    }

    if (!product) {
      _this.content.innerHTML = '<p class="alert error">' +
          'No Moment Tensor Found!' +
          '</p>';
    } else {
      _momentTensorView = MomentTensorView({
        el: _this.content,
        formatter: _formatter,
        model: product
      });
      _momentTensorView.render();
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
    Util.empty(_this.header);
    if (product) {
      _this.header.appendChild(_this.getProductHeader({
        product: product,
        summaryModule: ScientificSummaryModule
      }));
    }
  };


  _initialize(options);
  options = null;
  return _this;
};


MomentTensorModule.ID = _ID;
MomentTensorModule.TITLE = _TITLE;
MomentTensorModule.TYPES = _TYPES;


module.exports = MomentTensorModule;
