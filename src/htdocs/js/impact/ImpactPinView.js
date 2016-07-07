'use strict';


var Attribution = require('core/Attribution'),
    BasicPinView = require('core/BasicPinView'),
    CatalogEvent = require('pdl/CatalogEvent'),
    Formatter = require('core/Formatter'),
    ImpactSummaryModule = require('impact/ImpactSummaryModule'),
    Product = require('pdl/Product'),
    Util = require('util/Util');


var _DEFAULTS = {
  module: ImpactSummaryModule
};


/**
 * This pin presents impact bubbles for DYFI, ShakeMap, and PAGER products.
 * The intent is to provide high-level impact summary information on the
 * executive summary page.
 *
 */
var ImpactPinView = function (options) {
  var _this,
      _initialize,

      _config,
      _formatter;


  options = Util.extend({}, _DEFAULTS, options);
  _this = BasicPinView(options);

  /**
   * Constructor.
   *
   * @param options.formatter {core/Formatter}
   *     The formatter to use when generating content for this pin.
   * @param options.event {CatalogEvent}
   *     The event for which to generate impact pins.
   */
  _initialize = function (options) {
    _config = options.config || {};
    _formatter = options.formatter || Formatter();

    _this.event = options.event || CatalogEvent();
  };


  /**
   * Frees resources associated with this pin view.
   *
   */
  _this.destroy = Util.compose(function () {
    if (_this === null) {
      return;
    }

    _config = null;
    _formatter = null;

    _initialize = null;
    _this = null;
  }, _this.destroy);

  /**
   * Creates a generic impact bubble container.
   *
   * @return {HTMLElement}
   *     A generic HTMLElement with basic bubble classes applied.
   */
  _this.createBubble = function () {
    var bubble;

    bubble = document.createElement('span');
    bubble.classList.add('impact-pin-view-bubble');

    return bubble;
  };

  /**
   * Creates an attribution string for each unique contributor of DYFI,
   * ShakeMap and PAGER products.
   *
   * @return {String}
   *     An attribution string.
   */
  _this.getAttribution = function () {
    var product,
        source,
        sourceKeys,
        sources;

    sources = {};

    product = _this.event.getPreferredProduct(Product.getFullType(
        'dyfi', _config));
    if (product) {
      source = product.get('source');
      sources[source] = Attribution.getContributorReference(source);
    }

    product = _this.event.getPreferredProduct(Product.getFullType(
        'shakemap', _config));
    if (product) {
      source = product.get('source');
      sources[source] = Attribution.getContributorReference(source);
    }

    product = _this.event.getPreferredProduct(Product.getFullType(
        'losspager', _config));
    if (product) {
      source = product.get('source');
      sources[source] = Attribution.getContributorReference(source);
    }

    // Make list alphabetical
    sourceKeys = Object.keys(sources);
    sourceKeys.sort();

    return sourceKeys.map(function (key) {
      return sources[key];
    }).join(', ');
  };

  /**
   * Creates the DYFI impact bubble.
   *
   * @param summary {Object}
   *     An event summary with properties, specifically, a "cdi" property.
   *
   * @return {DocumentFragment}
   *     A document fragment containing relevant DYFI impact bubble data.
   */
  _this.getDyfiBubble = function (summary) {
    var bubble,
        cdi,
        fragment,
        value;

    fragment = document.createDocumentFragment();
    value = (summary && summary.properties) ? summary.properties.cdi : null;

    if (value !== null && typeof value !== 'undefined') {
      cdi = _formatter.mmi(value);
      bubble = fragment.appendChild(_this.createBubble());
      bubble.classList.add('mmi' + cdi);

      bubble.innerHTML = [
        '<strong class="impact-pin-view-value roman">',
          cdi,
        '</strong>',
        '<abbr class="impact-pin-view-title" ',
            'title="Did You Feel It? Maximum reported intensity.">',
          'DYFI?',
        '</abbr>'
      ].join('');
    }

    return fragment;
  };

  /**
   * Creates the PAGER impact bubble.
   *
   * @param summary {Object}
   *     An event summary with properties, specifically, an "alert" property.
   *
   * @return {DocumentFragment}
   *     A document fragment containing relevant PAGER impact bubble data.
   */
  _this.getPagerBubble = function (summary) {
    var bubble,
        fragment,
        value;

    fragment = document.createDocumentFragment();
    value = (summary && summary.properties) ? summary.properties.alert : null;

    if (value !== null && typeof value !== 'undefined') {
      bubble = fragment.appendChild(_this.createBubble());
      bubble.classList.add('pager-alertlevel-' + value);

      bubble.innerHTML = [
        '<strong class="impact-pin-view-value roman">',
          value.toUpperCase(),
        '</strong>',
        '<abbr class="impact-pin-view-title" ',
            'title="Prompt Assessment of Global Earthquakes for Response">',
          'PAGER',
        '</abbr>'
      ].join('');
    }

    return fragment;
  };

  /**
   * Creates the ShakeMap impact bubble.
   *
   * @param summary {Object}
   *     An event summary with properties, specifically, an "mmi" property.
   *
   * @return {DocumentFragment}
   *     A document fragment containing relevant ShakeMap impact bubble data.
   */
  _this.getShakeMapBubble = function (summary) {
    var bubble,
        fragment,
        mmi,
        value;

    fragment = document.createDocumentFragment();
    value = (summary && summary.properties) ? summary.properties.mmi : null;

    if (value !== null && typeof value !== 'undefined') {
      mmi = _formatter.mmi(value);
      bubble = fragment.appendChild(_this.createBubble());
      bubble.classList.add('mmi' + mmi);

      bubble.innerHTML = [
        '<strong class="impact-pin-view-value roman">',
          mmi,
        '</strong>',
        '<abbr class="impact-pin-view-title" ',
            'title="ShakeMap maximum instrumental intensity.">',
          'ShakeMap',
        '</abbr>'
      ].join('');
    }

    return fragment;
  };

  /**
   * Renders pin content. Delegates to sub-methods.
   *
   */
  _this.renderPinContent = function () {
    var fragment,
        summary;

    Util.empty(_this.content);

    if (!_this.event) {
      return;
    }

    fragment = document.createDocumentFragment();
    summary = _this.event.getSummary();

    fragment.appendChild(_this.getDyfiBubble(summary));
    fragment.appendChild(_this.getShakeMapBubble(summary));
    fragment.appendChild(_this.getPagerBubble(summary));

    _this.content.appendChild(fragment);
  };

  /**
   * Renders the pin footer.
   *
   */
  _this.renderPinFooter = function () {
    _this.footer.innerHTML = 'Contributed by ' +
        _this.getAttribution();
  };


  _initialize(options);
  options = null;
  return _this;
};


module.exports = ImpactPinView;
