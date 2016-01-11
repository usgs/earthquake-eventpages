'use strict';

var EventModulePage = require('base/EventModulePage'),
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


var _getOriginProducts = function (allProducts) {
  var origins,
      phases,
      productIndex,
      products;

  productIndex = [];
  products = [];

  origins = allProducts.origin || [];
  phases = allProducts['phase-data'] || [];

  // Build a lookup index for existing origins
  origins.forEach(function (origin) {
    products.push(JSON.parse(JSON.stringify(origin)));
    productIndex.push(origin.source + '_' + origin.code);
  });

  // Check phases, add phases that don't have a corresponding origin, or
  // attach phase product to corresponding existing origins
  phases.forEach(function (phase) {
    var phaseId,
        index;

    phaseId = phase.source + '_' + phase.code;
    index = productIndex.indexOf(phaseId);

    if (index === -1) {
      products.push(JSON.parse(JSON.stringify(phase)));
      productIndex.push(phaseId);
    } else {
      if (products[index].updateTime <= phase.updateTime) {
        products[index].phasedata = JSON.parse(JSON.stringify(phase));
      }
    }
  });

  return products;
};

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
      type,
      types;

  markup = document.createDocumentFragment();
  types = this._options.includeTypes;

  for (type in types) {
    markup.appendChild(_getTypeSummary({
      info: types[type],
      products: this.getProducts(type),
      type: type
    }));
  }

  this._content.innerHTML = '';
  this._content.appendChild(markup);
};

SummaryPage.prototype.getProducts = function (type) {
  var products;

  if (type === 'origin' || type === 'phase-data') {
    products = _getOriginProducts(this._event.properties.products);
  } else {
    products = this._event.properties.products[type];
  }

  return products || [];
};


module.exports = SummaryPage;
