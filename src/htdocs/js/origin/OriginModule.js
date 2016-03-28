'use strict';

var Formatter = require('core/Formatter'),
    Module = require('core/Module'),
    OriginView = require('origin/OriginView'),
    ScientificSummaryModule = require('general/GeneralSummaryModule'), // TODO :: Use scientific/ScientificSummaryModule
    Util = require('util/Util');


var _DEFAULTS,
    _ID,
    _TITLE,
    _TYPES;


_ID = 'origin';
_TITLE = 'Origin';
_TYPES = ['origin', 'phase-data'];

_DEFAULTS = {

};


var OriginModule = function (options) {
  var _this,
      _initialize,

      _formatter,
      _originView;


  _this = Module(options);

  _initialize = function (options) {
    options = Util.extend({}, _DEFAULTS, options);

    _formatter = options.formatter || Formatter;

    _this.ID = _ID;
    _this.TITLE = _TITLE;
  };


  _this.destroy = Util.compose(function () {
    if (_originView && _originView.destroy) {
      _originView.destroy();
    }

    _formatter = null;
    _originView = null;

    _initialize = null;
    _this =  null;
  }, _this.destroy);

  /**
   * Finds the proper origin-like product. First tries to get an origin product
   * if successful, checks if a phase-data product with the same source,
   * type and code exists, if so, uses that phase-data product instead.
   *
   * @return {Product}
   */
  _this.getOriginProduct = function () {
    var ev,
        origin,
        phase,
        product;

    origin = _this.getProduct('origin');

    if (origin) {
      ev = _this.model.get('event');
      phase = ev.getProductById('phase-data', origin.get('source'),
          origin.get('code'));
    }

    if (phase) {
      product = phase;
    } else {
      product = origin;
    }

    return product;
  };

  /**
   * Render the header, content and footer. Content rendering delegated
   * to {OriginView}.
   *
   */
  _this.render = function () {
    var product;

    product = _this.getOriginProduct();

    _this.renderHeader(product);
    _this.renderContent(product);
    _this.renderFooter(product);
  };

  _this.renderContent = function (product) {
    if (_originView && _originView.destroy) {
      _originView.destroy();
      _originView = null;
    }

    if (!product) {
      _this.content.innerHTML = '<p class="alert error">' +
          'No origin found!</p>';
    } else {
      _originView = OriginView({
        el: _this.content,
        formatter: _formatter,
        model: product
      });

      _originView.render();
    }
  };

  /**
   * Renders the footer content. This delegates to the getProductFooter method.
   *
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
   * Renders the header content. This delegates to teh getProductHeader method.
   *
   */
  _this.renderHeader = function (product) {
    var header;

    Util.empty(_this.header);
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


OriginModule.ID = _ID;
OriginModule.TITLE = _TITLE;
OriginModule.TYPES = _TYPES;


module.exports = OriginModule;
