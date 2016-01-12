'use strict';

var Attribution = require('base/Attribution'),
    Formatter = require('base/Formatter');


var _formatter = new Formatter();

var _getOriginProducts,

    getAttribution,
    getCodeFromHash,
    getProducts;


_getOriginProducts = function (allProducts) {
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


getAttribution = function (product) {
  if (product) {
    return '<small class="attribution">Data source ' +
      Attribution.getContributorReference(product.source) +
      ' last updated ' + _formatter.datetime(product.updateTime, 0) +
    '</small>';
  } else {
    return '';
  }
};

getCodeFromHash = function () {
  var parts;

  parts = window.location.hash.split(':');

  if (parts.length >= 2) {
    return parts[1];
  } else {
    return null;
  }
};


getProducts = function (eventDetails, type) {
  var products;

  if (type === 'origin' || type === 'phase-data') {
    products = _getOriginProducts(eventDetails.properties.products);
  } else {
    products = eventDetails.properties.products[type];
  }

  return products || [];
};

module.exports = {
  getAttribution: getAttribution,
  getCodeFromHash: getCodeFromHash,
  getProducts: getProducts
};
