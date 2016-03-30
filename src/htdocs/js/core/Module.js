'use strict';

var AccordionView = require('core/AccordionView'),
    Attribution = require('core/Attribution'),
    DownloadView = require('core/DownloadView'),
    Formatter = require('core/Formatter'),
    Util = require('util/Util'),
    View = require('mvc/View');

var _ID,
    _TITLE,
    _TYPES,

    _hasContent;


// Note: These should be overridden by each implementing sub-class.
_ID = 'module';
_TITLE = 'Default Module';
_TYPES = [];

_hasContent = function (/*eventPageModel*/) {
  return true;
};

var _DEFAULTS = {

};


var Module = function (options) {
  var _this,
      _initialize,

      _downloadView,
      _formatter;


  options = Util.extend({}, _DEFAULTS, options);
  _this = View(options);

  _initialize = function (options) {
    var el;

    _this.ID = _ID;
    _this.TITLE = _TITLE;
    _formatter = options.formatter || Formatter();

    el = _this.el;
    el.innerHTML =
      '<div class="module-header"></div>' +
      '<div class="module-content"></div>' +
      '<div class="module-footer"></div>';

    // references to sections for subclass access
    _this.header = el.querySelector('.module-header');
    _this.content = el.querySelector('.module-content');
    _this.footer = el.querySelector('.module-footer');
  };

  /**
   * Free references.
   */
  _this.destroy = Util.compose(function () {
    if (_downloadView) {
      // clean up any previous footer
      _downloadView.destroy();
      _downloadView = null;
    }

    _formatter = null;

    _initialize = null;
    _this = null;
  }, _this.destroy);

  /**
   * Remove "internal-" prefix and "-scenario" suffix from product "type".
   *
   * @param type {String}
   *     The initial product type.
   *
   * @return {String}
   *     The base product type without any known prefix or suffix.
   */
  _this.getBaseType = function (type) {
    var base;

    base = type;

    if (base.startsWith('internal-')) {
      base = base.replace('internal-', '');
    }

    if (base.endsWith('-scenario')) {
      base = base.replace('-scenario', '');
    }

    return base;
  };

  /**
   * Get a product from the event based on module parameters and event config.
   *
   * Uses module parameters "source", "code", and optionally "updateTime".
   * If "updateTime" is omitted, the latest version from "source" and "code" is
   * returned.  If no product matching "source" and "code" is found, returns
   * preferred product.
   *
   * @param type {String}
   *     product base type.
   *     event configuration determines whether or not to add a scenario suffix.
   * @return {Product}
   *     matching product, or null if not found.
   */
  _this.getProduct = function (type) {
    var code,
        config,
        ev,
        params,
        product,
        source,
        updateTime;

    ev = _this.model.get('event');
    params = _this.model.get(_this.ID) || {};
    source = params.source || null;
    code = params.code || null;
    updateTime = params.updateTime || null;

    config = _this.model.get('config');

    if (config && config.SCENARIO_MODE === true) {
      type += '-scenario';
    }

    product = null;
    if (ev && source !== null && code !== null) {
      product = ev.getProductById(type, source, code, updateTime);
    }
    if (ev && product === null) {
      product = ev.getPreferredProduct(type);
    }
    return product;
  };

  /**
   * Get all products of a specific type. If the config.SCENARIO_MODE, then
   * get the -scenario variant of the specified type.
   *
   * @param type {String}
   *     The base type of products to get.
   *
   * @return {Array}
   *     An array of the matching type of product. This might be an empty array.
   */
  _this.getProducts = function (type) {
    var config,
        catalogEvent;

    config = _this.model.get('config');
    catalogEvent = _this.model.get('event');

    if (config && config.SCENARIO_MODE === true) {
      type += '-scenario';
    }

    if (catalogEvent) {
      return catalogEvent.getProducts(type);
    } else {
      return [];
    }
  };

  /**
   * Get a product footer. Generalized footer includes only the Downloads.
   *
   */
  _this.getProductFooter = function (options) {
    var content,
        el;

    if (_downloadView) {
      // clean up any previous footer
      _downloadView.destroy();
      _downloadView = null;
    }

    content = options.product.getContent('contents.xml');
    if (content) {
      el = document.createElement('div');
      _downloadView = AccordionView({
        classes: 'accordion-standard accordion-page-downloads',
        el: el,
        toggleElement: 'h3',
        toggleText: 'Downloads',
        view: DownloadView({
          model: content,
          product: options.product,
          formatter: _formatter
        })
      });
      _downloadView.render();
    }

    return el;
  };

  /**
   * Get a product header.
   *
   * @param options {Object}
   * @param options.product {Product}
   *     product to summarize.
   * @param options.summaryModule {Module}
   *     default null.
   *     include link to module with all versions of `product`.
   */
  _this.getProductHeader = function (options) {
    var buf,
        el,
        ev,
        numProducts,
        preferred,
        product,
        reviewed,
        type,
        summaryModule;

    product = options.product;
    summaryModule = options.summaryModule;

    buf = [];
    ev = _this.model.get('event');
    type = product.get('type');
    preferred = (ev.getPreferredProduct(type) === product);
    reviewed = product.isReviewed();

    if (summaryModule) {
      numProducts = ev.getProducts(type).length;
      buf.push('<a class="back-to-summary-link"' +
          ' href="#'  + summaryModule.ID + '">');
      if (numProducts > 1) {
        buf.push('View alternative ' + _this.TITLE + 's' +
            ' (' + numProducts + ' total)');
      } else {
        buf.push('Back to ' + summaryModule.TITLE);
      }
      buf.push('</a>');
    }

    buf.push('<small class="attribution">' +
        'Contributed by ' + Attribution.getProductAttribution(product) +
        ' last updated ' + _formatter.datetime(product.get('updateTime')) +
        '</small>');

    buf.push('<ul class="quality-statements no-style">');
    if (preferred) {
      buf.push('<li class="preferred">' +
          'The data below are the most preferred data available' +
          '</li>');
    } else {
      buf.push('<li class="unpreferred">' +
          'The data below are <strong>NOT</strong>' +
          ' the most preferred data available' +
          '</li>');
    }
    if (reviewed === true) {
      buf.push('<li class="reviewed">' +
          'The data below have been reviewed by a scientist' +
          '</li>');
    } else if (reviewed === false) {
      // only claim product is unreviewed if review-status property was set.
      buf.push('<li class="unreviewed">' +
          'The data below have <strong>NOT</strong>' +
          ' been reviewed by a scientist.' +
          '</li>');
    }
    buf.push('</ul>');

    el = document.createElement('div');
    el.classList.add('product-header');
    el.innerHTML = buf.join('');
    return el;
  };

  /**
   * Render module content.
   */
  _this.render = function () {
    _this.header.innerHTML = '<h3>Module Header</h3>';
    _this.content.innerHTML = '<h3>Module Content</h3>';
    _this.footer.innerHTML = '<h3>Module Footer</h3>';
  };


  _initialize(options);
  options = null;
  return _this;
};


Module.ID = _ID;
Module.TITLE = _TITLE;
Module.TYPES = _TYPES;

Module.hasContent = _hasContent;


module.exports = Module;
