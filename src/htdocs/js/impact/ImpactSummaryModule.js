'use strict';

var Attribution = require('core/Attribution'),
    Formatter = require('core/Formatter'),
    SummaryModule = require('core/SummaryModule'),
    Util = require('util/Util');


var _ID,
    _TITLE,
    _TYPES;

_ID = 'impact';
_TITLE = 'Impact';
_TYPES = ['dyfi', 'shakemap', 'losspager'];


var _DEFAULTS = {

};


var ImpactSummaryModule = function (options) {
  var _this,
      _initialize,

      _formatter;


  options = Util.extend({}, _DEFAULTS, options);
  _this = SummaryModule(options);

  _initialize = function (options) {
    _formatter = options.formatter || Formatter();

    _this.ID = _ID;
    _this.TITLE = _TITLE;
  };

  _this.destroy = Util.compose(function () {
    _formatter = null;

    _initialize = null;
    _this = null;
  }, _this.destroy);

  _this.getDyfiSummary = function (products) {
    return _this.createSummary(products, 'Did You Feel It?', [
        'Catalog',
        '<abbr title="Community Determined Intensity">CDI</abbr>',
        'Responses',
        'Source'
      ], _this.getDyfiRow);
  };

  _this.getDyfiRow = function (product, index) {
    var preferred,
        row;

    preferred = (index === 0);
    row = _this.createRow(preferred);

    row.innerHTML = [
      '<th scope="row">',
        _this.getCatalogMarkup(product, preferred),
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

  _this.getLinksHeader = function () {
    var header;

    header = document.createElement('h3');
    header.innerHTML = 'Impact Links';

    return header;
  };

  _this.getPagerSummary = function (products) {
    return _this.createSummary(products, 'PAGER', [
        'Catalog',
        'Alert Level',
        'Source'
      ], _this.getPagerRow);
  };

  _this.getPagerRow = function (product, index) {
    var alertLevel,
        preferred,
        row;

    preferred = (index === 0);
    row = _this.createRow(preferred);

    alertLevel = product.getProperty('alertlevel') || 'pending';

    row.innerHTML = [
      '<th scope="row">',
        _this.getCatalogMarkup(product, preferred),
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

  _this.getShakeMapSummary = function (products) {
    return _this.createSummary(products, 'ShakeMap', [
        'Catalog',
        '<abbr title="Maximum Modified Mercalli Intensity">MMI</abbr>',
        'Source',
        'Description'
      ], _this.getShakeMapRow);
  };

  _this.getShakeMapRow = function (product, index) {
    var preferred,
        row;

    preferred = (index === 0);
    row = _this.createRow(preferred);

    row.innerHTML = [
      '<th scope="row">',
        _this.getCatalogMarkup(product, preferred),
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
