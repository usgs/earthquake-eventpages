'use strict';

var EventModulePage = require('base/EventModulePage'),
    EventUtil = require('base/EventUtil'),
    Formatter = require('base/Formatter'),

    Util = require('util/Util');


var _DEFAULTS = {
  title: 'Summary',
  hash: 'summary',
  includeTypes: {
    /*
    type: {
      display: {String},
      columns: [
        {
          label: {String},
          value: {Function}
        },...
      ]
    }, ...
    */
  }
};

var _FORMATTER = new Formatter();


var _getTableHeaders = function (params) {
  return '<tr>' + params.columns.reduce(function (prev, column) {
    return prev + '<th scope="col">' + column.label + '</th>';
  }, '') + '</tr>';
};


var _getTableRow = function (params) {
  params.formatter = params.formatter || _FORMATTER;

  return '<tr class="' + (params.preferred ? 'preferred' : '') + '">' +
    params.columns.reduce(function (prev, column) {
      return prev + '<td>' + column.value(params) + '</td>';
  }, '') + '</tr>';
};

var _getTableRows = function (params) {
  return params.products.reduce(function (prev, product, index) {
    return prev + _getTableRow({
      product: product.phasedata || product,
      columns: params.columns,
      preferred: (index === 0)
    });
  }, '');
};

var _getTypeSummary = function (params) {
  var header,
      info,
      summary,
      table;

  summary = document.createDocumentFragment();
  info = params.info;

  header = summary.appendChild(document.createElement('h2'));
  header.innerHTML = info.display;

  table = summary.appendChild(document.createElement('div'));
  table.classList.add('horizontal-scrolling');
  table.innerHTML = [
    '<table class="table-summary">',
      '<thead>',
        _getTableHeaders(info),
      '</thead>',
      '<tbody>',
        _getTableRows({products: params.products, columns: info.columns}),
      '</tbody>',
    '</table>'
  ].join('');

  return summary;
};


var SummaryPage = function (options) {
  this._options = Util.extend({}, _DEFAULTS, options);
  EventModulePage.call(this, this._options);
};

SummaryPage.prototype = Object.create(EventModulePage.prototype);


SummaryPage.prototype._setHeaderMarkup = function () {
  // Do nothing, no header on summary pages.
};

SummaryPage.prototype._setContentMarkup = function () {
  var markup,
      products,
      type,
      types;

  markup = document.createDocumentFragment();
  types = this._options.includeTypes;

  for (type in types) {
    products = this.getProducts(type);

    if (products.length > 0) {
      markup.appendChild(_getTypeSummary({
        info: types[type],
        products: products,
        type: type
      }));
    }
  }

  this._content.innerHTML = '';
  this._content.appendChild(markup);
};

SummaryPage.prototype.getProducts = function (type) {
  return EventUtil.getProducts(this._event, type);
};


module.exports = SummaryPage;
