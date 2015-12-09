'use strict';
/**
 * This is a static utility class that knows how to summarize each notable
 * product. The generalized `getProductSummary` method is the primary entry
 * point for product summarization, however each notable product may be
 * directly summarized as well.
 *
 * @see #getProductSummary
 */

var Attribution = require('./Attribution'),
    BeachBall = require('scientific/tensor/BeachBall'),
    EventModulePage = require('./EventModulePage'),
    Formatter = require('./Formatter'),
    ImpactUtil = require('./ImpactUtil'),
    Tensor = require('scientific/tensor/Tensor');


var _formatter,

    _getBeachBall,
    _getOriginProducts,

    getDYFISummary,
    getFiniteFaultSummary,
    getFocalMechanismSummary,
    getLossPAGERSummary,
    getMomentTensorSummary,
    getOriginSummary,
    getProductSummary,
    getShakeMapSummary;


/* Formatter used throughout the class */
_formatter = new Formatter();


/**
 * @PrivateMethod
 *
 * Produces a data URL for a beach ball image the represents the given tensor.
 *
 * @param tensor {scientific/tensor/Tensor}
 *
 * @return {scientific/tensor/BeachBall}
 */
_getBeachBall = function (tensor) {
  return new BeachBall({
    tensor: tensor,
    size: 200,
    plotAxes: false,
    plotPlanes: true,
    fillColor: tensor.fillColor,
  }).getCanvas().toDataURL();
};

/**
 * Determines the "origin" products from a keyed object of all products for a
 * given event. Considers phase-data and actual origin products as a potential
 * "origin" product.
 *
 * If a unique (source+sourceCode) phase-data or origin product exists, it is
 * considered an "origin" product for the event.
 *
 * If phase-data and origin product exist with the same source+sourceCode, the
 * most recently updated of the two is considered an "origin" product for the
 * event and the other is discarded. If thw two products have the same
 * update time, the phase-data product is considered an "origin" product and the
 * origin itself is discarded.
 *
 * @param products {Object}
 *      An object keyed by product type whose corresponding values are an
 *      array of products of that type in descending preferrred-ness order.
 *
 * @return {Array}
 *      An array of origin-like products in descending preferred order.
 */
_getOriginProducts = function (products) {
  var index,
      originProducts,
      originSourceCodes,
      phaseProducts,
      phaseSourceCode;

  originSourceCodes = [];

  try {
    originProducts = products.origin.slice(0);
    phaseProducts = products['phase-data'];

    if (!phaseProducts) {
      return originProducts;
    }

    // Build list of origin ids for lookup later
    originSourceCodes = originProducts.map(function (origin) {
      return origin.source + '_' + origin.code;
    });

    // Look at phase data products, if an older corresponding origin exists,
    // replace it with the phase data product instead, otherwise append phase
    // data product to list of origins
    phaseProducts.forEach(function (phaseData) {
      phaseSourceCode = phaseData.source + '_' + phaseData.code;
      index = originSourceCodes.indexOf(phaseSourceCode);

      if (index === -1) {
        originProducts.push(phaseData);
        originSourceCodes.push(phaseSourceCode);
      } else if (originProducts[index].updateTime <= phaseData.updateTime) {
        originProducts[index] = phaseData;
      }
    });
  } catch (e) {
    originProducts = [];
  } finally {
    return originProducts;
  }
};


/**
 * @APIMethod
 *
 * Gets the summary markup for a given "dyfi" product.
 *
 * @param product {Object}
 *      An object with properties commonly found on a DYFI product.
 *
 * @return {String}
 *      Markup that summarizes the product.
 */
getDYFISummary = function (product) {
  var properties = product.properties,
      contents = product.contents,
      eventId = properties.eventsource + properties.eventsourcecode,
      maxmmi = properties.maxmmi,
      thumbnail;

  maxmmi = ImpactUtil.translateMmi(maxmmi);
  thumbnail = contents[eventId + '_ciim.jpg'];

  return [
    '<ul>',
      '<li class="impact-bubbles">',
        '<span class="mmi', maxmmi, '">',
          '<strong class="roman">', maxmmi, '</strong>',
          '<br/>',
          '<abbr title="Community Determined Intensity">CDI</abbr>',
        '</span>',
      '</li>',
      '<li>',
        '<span>', properties['num-responses'], '</span>',
        '<abbr title="Number of Responses">Responses</abbr>',
      '</li>',
    '</ul>'
  ].join('');
};

/**
 * @APIMethod
 *
 * Gets the summary markup for a given "finite-fault" product.
 *
 * @param product {Object}
 *      An object with properties commonly found on a Finite Fault product.
 *
 * @return {String}
 *      Markup that summarizes the product.
 */
getFiniteFaultSummary = function (product) {
  var basemap;

  basemap = product.contents['basemap.png'];

  return [
    '<ul>',
      '<li class="image">',
        '<img src="', basemap.url, '" alt="Finite Fault" />',
      '</li>',
      '<li>',
        Attribution.getContributorReference(product.source),
        '<abbr title="Finite Fault Data Source">Source</abbr>',
      '</li>',
    '</ul>'
  ].join('');
};

/**
 * @APIMethod
 *
 * Gets the summary markup for a given "focal-mechanism" product.
 *
 * @param product {Object}
 *      An object with properties commonly found on a Focal Mechanism product.
 *
 * @return {String}
 *      Markup that summarizes the product.
 */
getFocalMechanismSummary = function (product) {
  var beachBall,
      np1,
      np2,
      source,
      tensor;

  tensor = Tensor.fromProduct(product);

  if (tensor !== null) {
    np1 = tensor.NP1;
    np2 = tensor.NP2;
    source = tensor.source;
  } else {
    source = product.source;
  }

  beachBall = _getBeachBall(tensor);

  return [
    '<ul>',
      '<li class="image">',
        '<img src="', beachBall, '" ',
            'alt="Focal Mechanism Beachball (' + tensor.code + ')"/>',
      '</li>',
      '<li class="wider">',
        '<span>',
          '(',
          (np1 ?
              Math.round(np1.strike) + '<i>,</i>' +
              Math.round(np1.dip) + '<i>,</i>' +
              Math.round(np1.rake) :
              '&ndash;'),
          ')',
        '</span>',
        '<abbr title="Nodal Plane 1">',
          'Strike<i>,</i>Dip<i>,</i>Rake</abbr>',
        '</abbr>',
      '</li>',
      '<li class="wider">',
        '<span>',
          '(',
          (np2 ?
              Math.round(np2.strike) + '<i>,</i>' +
              Math.round(np2.dip) + '<i>,</i>' +
              Math.round(np2.rake) :
              '&ndash;'),
          ')',
        '</span>',
        '<abbr title="Nodal Plane 2">',
          'Strike<i>,</i>Dip<i>,</i>Rake</abbr>',
        '</abbr>',
      '</li>',
      '<li>',
        Attribution.getContributorReference(source),
        '<abbr title="', Attribution.getName(source), '">Source</abbr>',
      '</li>',
    '</ul>',
  ].join('');
};

/**
 * @APIMethod
 *
 * Gets the summary markup for a given "losspager" product.
 *
 * @param product {Object}
 *      An object with properties commonly found on a LossPAGER product.
 *
 * @return {String}
 *      Markup that summarizes the product.
 */
getLossPAGERSummary = function (product) {
  var alertlevel,
      properties;

  properties = product.properties || {};
  alertlevel = properties.alertlevel;

  return [
    '<ul>',
      '<li class="impact-bubbles">',
        '<span class="pager-alertlevel-', alertlevel, '">',
          '<strong class="roman">', alertlevel.toUpperCase(), '</strong>',
          '<br/>',
          '<abbr title="Alert Level">Alert</abbr>',
        '</span>',
      '</li>',
    '</ul>'
  ].join('');
};

/**
 * @APIMethod
 *
 * Gets the summary markup for a given "moment-tensor" product.
 *
 * @param product {Object}
 *      An object with properties commonly found on a Moment Tensor product.
 *
 * @return {String}
 *      Markup that summarizes the product.
 */
getMomentTensorSummary = function (product) {  var beachBall,
      code,
      depth,
      magnitude,
      percentDC,
      source,
      tensor,
      type;

  tensor = Tensor.fromProduct(product);
  if (tensor !== null) {
    type = tensor.type;
    source = tensor.source;
    code = tensor.code;
    magnitude = tensor.magnitude;
    magnitude = _formatter.magnitude(magnitude);
    depth = Math.round(tensor.depth);
    percentDC = Math.round(tensor.percentDC * 100);
  } else {
    type = '&ndash;';
    magnitude = '&ndash;';
    depth = '&ndash;';
    percentDC = '&ndash;';
    source = product.source;
    code = product.code;
  }

  beachBall = new BeachBall({
    tensor: tensor,
    size: 200,
    plotAxes: false,
    plotPlanes: true,
    fillColor: tensor.fillColor,
  }).getCanvas().toDataURL();

  return [
    '<ul>',
      '<li class="image">',
        (tensor === null ? code : '<img src="' + beachBall +
            '" alt="Moment Tensor Beachball (' + code + ')"/>'),
      '</li>',
      '<li>',
        '<span>', type, '</span>',
        '<abbr title="Tensor Type">Type</abbr>',
      '</li>',
      '<li>',
        '<span>', magnitude, '</span>',
        '<abbr title="Magnitude">Mag</abbr>',
      '</li>',
      '<li>',
        '<span>', depth, '<span class="units">km</span></span>',
        '<abbr title="Depth (km)">Depth</abbr>',
      '</li>',
      '<li>',
        '<span>', percentDC, '</span>',
        '<abbr title="Percent Double Couple">% DC</abbr>',
      '</li>',
      '<li>',
        Attribution.getContributorReference(source),
        '<abbr title="Moment Tensor Data Source">Source</abbr>',
      '</li>',
    '</ul>'
  ].join('');
};

/**
 * @APIMethod
 *
 * Gets the summary markup for a given "origin" product.
 *
 * @param product {Object}
 *      An object with properties commonly found on a Origin product.
 *
 * @return {String}
 *      Markup that summarizes the product.
 */
getOriginSummary = function (product) {
  var p,
      depth,
      magnitude,
      magnitudeType,
      originSource,
      magnitudeSource;

  if (!product) {
    return '<p class="alert error">No origin product found for this event.</p>';
  }

  p = product.properties;
  depth = p.depth;
  magnitude = p.magnitude;
  magnitudeType = p['magnitude-type'];
  originSource = p['origin-source'] || product.source;
  magnitudeSource = p['magnitude-source'] || product.source;


  return [
    '<ul>',
      '<li>',
        '<span>', magnitude, '</span>',
        '<abbr title="Magnitude">Mag</abbr>',
      '</li>',
      '<li>',
        '<span>', magnitudeType, '</span>',
        '<abbr title="Magnitude Type">Type</abbr>',
      '</li>',
      '<li>',
        '<span>', depth, '</span>',
        '<abbr title="Depth (km)">Depth</abbr>',
      '</li>',
      '<li>',
        EventModulePage.prototype.getCatalogSummary.call(null, product),
      '</li>',
      '<li>',
        (originSource === magnitudeSource ?
          Attribution.getContributorReference(originSource) :
          '<span>' +
            Attribution.getContributorReference(originSource) + ', ' +
            Attribution.getContributorReference(magnitudeSource) +
          '</span>'),
        '<abbr title="Location and Magnitude Data Source">Source</abbr>',
      '</li>',
    '</ul>'
  ].join('');
};

/**
 * @APIMethod
 *
 * @param type {String}
 *      Product type
 * @param hash {String}
 *      Link to product details
 * @param name {String}
 *      Header text used to label the product summary
 * @param eventDetails {Object}
 *      Object with properties representing the current event
 *
 * @return {String}
 *      Markup for the product summary
 */
getProductSummary = function (type, hash, name, eventDetails) {
  var allProducts,
      products,
      summary;

  allProducts = eventDetails.properties.products;
  summary = [];
  products = allProducts[type];

  if (type === 'origin' || type === 'phase-data') {
    products = _getOriginProducts(allProducts);
    summary = getOriginSummary(products[0]);
  } else if (type === 'dyfi') {
    summary = getDYFISummary(products[0]);
  } else if (type === 'shakemap') {
    summary = getShakeMapSummary(products[0]);
  } else if (type === 'losspager') {
    summary = getLossPAGERSummary(products[0]);
  } else if (type === 'moment-tensor') {
    summary = getMomentTensorSummary(products[0]);
  } else if (type === 'focal-mechanism') {
    summary = getFocalMechanismSummary(products[0]);
  } else if (type === 'finite-fault') {
    summary = getFiniteFaultSummary(products[0]);
  }

  if (summary) {
    return [
      '<h3>', name, '</h3>',
      '<a href="#', hash, '" class="horizontal-scrolling ',
          type, '-summary summary">',
        summary,
      '</a>'
    ].join('');
  } else {
    return '<p class="alert warning">' +
        'No product summary for product type &ldquo;' + type + '&rdquo;</p>';
  }
};

/**
 * @APIMethod
 *
 * Gets the summary markup for a given "shakemap" product.
 *
 * @param product {Object}
 *      An object with properties commonly found on a ShakeMap product.
 *
 * @return {String}
 *      Markup that summarizes the product.
 */
getShakeMapSummary = function (product) {
  var properties = product.properties,
      contents = product.contents,
      maxmmi = properties.maxmmi,
      thumbnail;

  maxmmi = ImpactUtil.translateMmi(maxmmi);
  thumbnail = contents['download/intensity.jpg'];

  return [
    '<ul>' +
      '<li class="impact-bubbles">',
        '<span class="mmi', maxmmi, '">',
          '<strong class="roman">', maxmmi, '</strong>',
          '<br/>',
          '<abbr title="Modified Mercalli Intenisty">MMI</abbr>',
        '</span>',
      '</li>',
      '<li>',
        '<span>', _formatter.magnitude(properties.magnitude), '</span>',
        '<abbr title="Magnitude">Mag</abbr>',
      '</li>',
      '<li>',
        EventModulePage.prototype.getCatalogSummary.call(null, product),
      '</li>',
      '<li>',
        Attribution.getContributorReference(product.source),
        '<abbr title="ShakeMap Data Source">Source</abbr>',
      '</li>',
    '</ul>'
  ].join('');
};


// Export the API
module.exports = {
  getDYFISummary: getDYFISummary,
  getFiniteFaultSummary: getFiniteFaultSummary,
  getFocalMechanismSummary: getFocalMechanismSummary,
  getLossPAGERSummary: getLossPAGERSummary,
  getMomentTensorSummary: getMomentTensorSummary,
  getOriginSummary: getOriginSummary,
  getProductSummary: getProductSummary,
  getShakeMapSummary: getShakeMapSummary
};
