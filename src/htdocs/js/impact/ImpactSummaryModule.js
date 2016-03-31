'use strict';

var Attribution = require('core/Attribution'),
    Formatter = require('core/Formatter'),
    SummaryModule = require('core/SummaryModule'),
    Util = require('util/Util'),

    // these modules create a circular dependency,
    // require them in initialize
    DYFIModule,
    PAGERModule,
    ShakeMapModule;


var _ID,
    _TITLE,
    _TYPES;

_ID = 'impact';
_TITLE = 'Impact Summary';
_TYPES = ['dyfi', 'shakemap', 'losspager'];


var _DEFAULTS = {

};


/**
 * Summary module for the impact products.
 *
 */
var ImpactSummaryModule = function (options) {
  var _this,
      _initialize,

      _formatter;


  options = Util.extend({}, _DEFAULTS, options);
  _this = SummaryModule(options);

  /**
   * Constructor. Initializes a new {ImpactSummaryModule}.
   *
   * @param options {Object}
   *     See Module#initialize documentation for details.
   */
  _initialize = function (options) {
    _formatter = options.formatter || Formatter();

    _this.ID = _ID;
    _this.TITLE = _TITLE;

    // these modules create a circular dependency,
    // require them first time initialize is called
    DYFIModule = DYFIModule || require('dyfi/DYFIModule');
    PAGERModule = PAGERModule || require('losspager/PAGERModule');
    ShakeMapModule = ShakeMapModule || require('shakemap/ShakeMapModule');
  };

  /**
   * Frees resources associated with this module.
   *
   */
  _this.destroy = Util.compose(function () {
    _formatter = null;

    _initialize = null;
    _this = null;
  }, _this.destroy);

  /**
   * Gets the summary for the list of DYFI products.
   *
   * @param products {Array}
   *     An array of DYFI {Product}s to summarize.
   *
   * @return {DocumentFragment}
   *     A fragment containing the summary for the products.
   */
  _this.getDyfiSummary = function (products) {
    return _this.createSummary(products, 'Did You Feel It?', [
        'Catalog',
        '<abbr title="Community Determined Intensity">CDI</abbr>',
        'Responses',
        'Source'
      ], _this.getDyfiRow);
  };

  /**
   * Gets a single summary row for the single given product.
   *
   * @param product {Product}
   *     The product to summarize.
   * @param index {Number}
   *     The relative preferred number for the given product.
   *     0 = most preferred
   *
   * @return {DOMElement}
   *     A TR DOM Element for the row summary.
   */
  _this.getDyfiRow = function (product, index) {
    var preferred,
        row;

    preferred = (index === 0);
    row = _this.createRow(preferred);
    row.innerHTML = [
      '<th scope="row">',
        _this.getCatalogMarkup(DYFIModule, product, preferred),
      '</th>',
      '<td>',
        _formatter.intensity(product.getProperty('maxmmi')),
      '</td>',
      '<td>',
        product.getProperty('num-responses'),
      '</td>',
      '<td>',
        Attribution.getProductAttribution(product),
      '</td>'
    ].join('');

    return row;
  };

  /**
   * Gets the header for the links section for this module.
   *
   * @return {DOMElement}
   *     The header element.
   */
  _this.getLinksHeader = function () {
    var header;

    header = document.createElement('h3');
    header.innerHTML = 'Impact Links';

    return header;
  };

  /**
   * Gets the summary for the list of LossPAGER products.
   *
   * @param products {Array}
   *     An array of LossPAGER {Product}s to summarize.
   *
   * @return {DocumentFragment}
   *     A fragment containing the summary for the products.
   */
  _this.getPagerSummary = function (products) {
    return _this.createSummary(products, 'PAGER', [
        'Catalog',
        'Alert Level',
        'Source'
      ], _this.getPagerRow);
  };

  /**
   * Gets a single summary row for the single given product.
   *
   * @param product {Product}
   *     The product to summarize.
   * @param index {Number}
   *     The relative preferred number for the given product.
   *     0 = most preferred
   *
   * @return {DOMElement}
   *     A TR DOM Element for the row summary.
   */
  _this.getPagerRow = function (product, index) {
    var alertLevel,
        preferred,
        row;

    preferred = (index === 0);
    row = _this.createRow(preferred);

    alertLevel = product.getProperty('alertlevel') || 'pending';

    row.innerHTML = [
      '<th scope="row">',
        _this.getCatalogMarkup(PAGERModule, product, preferred),
      '</th>',
      '<td>',
        '<span class="mmi pager-alertlevel-', alertLevel.toLowerCase(), '">',
          '<strong class="roman">',
            alertLevel.toUpperCase(),
          '</strong>',
        '</span>',
      '</td>',
      '<td>',
        Attribution.getProductAttribution(product),
      '</td>'
    ].join('');

    return row;
  };

  /**
   * Gets the summary for the list of ShakeMap products.
   *
   * @param products {Array}
   *     An array of ShakeMap {Product}s to summarize.
   *
   * @return {DocumentFragment}
   *     A fragment containing the summary for the products.
   */
  _this.getShakeMapSummary = function (products) {
    return _this.createSummary(products, 'ShakeMap', [
        'Catalog',
        '<abbr title="Maximum Modified Mercalli Intensity">MMI</abbr>',
        'Source',
        'Description'
      ], _this.getShakeMapRow);
  };

  /**
   * Gets a single summary row for the single given product.
   *
   * @param product {Product}
   *     The product to summarize.
   * @param index {Number}
   *     The relative preferred number for the given product.
   *     0 = most preferred
   *
   * @return {DOMElement}
   *     A TR DOM Element for the row summary.
   */
  _this.getShakeMapRow = function (product, index) {
    var preferred,
        row;

    preferred = (index === 0);
    row = _this.createRow(preferred);

    row.innerHTML = [
      '<th scope="row">',
        _this.getCatalogMarkup(ShakeMapModule, product, preferred),
      '</th>',
      '<td>',
        _formatter.intensity(product.getProperty('maxmmi')),
      '</td>',
      '<td>',
        Attribution.getProductAttribution(product),
      '</td>',
      '<td>',
        product.getProperty('event-description') || '&ndash;',
      '</td>'
    ].join('');

    return row;
  };

  /**
   * Renders the summary content. Defers to sub-methods.
   *
   */
  _this.render = function () {
    var dyfi,
        fragment,
        header,
        link,
        pager,
        shakemap,
        text;

    fragment = document.createDocumentFragment();

    _this.clearTexts(true);
    _this.clearLinks(true);


    header = _this.getProducts('impact-header');

    dyfi = _this.getProducts('dyfi');
    shakemap = _this.getProducts('shakemap');
    pager = _this.getProducts('losspager');

    text = _this.getProducts('impact-text');
    link = _this.getProducts('impact-link');


    _this.header.innerHTML = '<h2>Impact Summary</h2>';
    _this.header.appendChild(_this.getTexts(header));

    fragment.appendChild(_this.getDyfiSummary(dyfi));
    fragment.appendChild(_this.getShakeMapSummary(shakemap));
    fragment.appendChild(_this.getPagerSummary(pager));
    fragment.appendChild(_this.getTexts(text));
    fragment.appendChild(_this.getLinks(link));

    Util.empty(_this.content);
    _this.content.appendChild(fragment);

    _this.footer.innerHTML = '';
  };


  _initialize(options);
  options = null;
  return _this;
};


ImpactSummaryModule.ID = _ID;
ImpactSummaryModule.TITLE = _TITLE;
ImpactSummaryModule.TYPES = _TYPES;


module.exports = ImpactSummaryModule;
