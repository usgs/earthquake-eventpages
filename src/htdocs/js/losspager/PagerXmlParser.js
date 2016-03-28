'use strict';

var Util = require('util/Util');


var XML_VERSION_STRING = '1.0'; // pager.xml version number

// Meta info about the exposure levels
var EXPOSURE_INFO = [
  // MMI-0 doesn't exist, but arrays are zero-indexed, this is a placeholder
  {perc:'Not Felt',resist:'none',vuln:'none',roman:'I',label:'I',css:'mmiI'},
  {perc:'Not Felt',resist:'none',vuln:'none',roman:'I',label:'I',css:'mmiI'},

  // MMI-II and MMI-III are combined, need separate placeholders
  {perc:'Weak',resist:'none',vuln:'none',roman:'II',label:'II-III',
      css:'mmiII'},
  {perc:'Weak',resist:'none',vuln:'none',roman:'III',label:'II-III',
      css:'mmiIII'},

  {perc:'Light',resist:'none',vuln:'none',roman:'IV',label:'IV',css:'mmiIV'},
  {perc:'Moderate',resist:'Very Light',vuln:'Light',roman:'V',label:'V',
      css:'mmiV'},
  {perc:'Strong',resist:'Light',vuln:'Moderate',roman:'VI',label:'VI',
      css:'mmiVI'},
  {perc:'Very Strong',resist:'Moderate',vuln:'Moderate/Heavy',roman:'VII',
      label:'VII',css:'mmiVII'},
  {perc:'Severe',resist:'Moderate/Heavy',vuln:'Heavy',roman:'VIII',
      label:'VIII',css:'mmiVIII'},
  {perc:'Violent',resist:'Heavy',vuln:'Very Heavy',roman:'IX',label:'IX',
      css:'mmiIX'},
  {perc:'Extreme',resist:'Very Heavy',vuln:'Very Heavy',roman:'X',label:'X',
      css:'mmiX'},
  {perc:'Extreme',resist:'Very Heavy',vuln:'Very Heavy',roman:'XI',label:'XI',
      css:'mmiX'},
  {perc:'Extreme',resist:'Very Heavy',vuln:'Very Heavy',roman:'XII',
      label:'XII',css:'mmiX'}
];


/**
 * Sorts the cities so the first 11 in the list of the "selected" cities and
 * the remainder of the list is sorted by MMI (decreasing).
 *
 * @param cities {Array}
 *      An array of city information to sort. This array is modified in-place,
 *      so callers of this method should be careful to pass in a copy
 *      (Array.slice) of the array if they need the original to remain
 *      unchanged.
 *
 * @return {Array}
 *      A specially-sorted array of city information.
 */
var _sortCities = function (cities) {
  var sortedCities = [];

  function compareMmi (a, b) {
    return b.mmi - a.mmi;
  }

  function comparePopulation (a, b) {
    return b.population - a.population;
  }

  function compareCapital (a, b) {
    var acap = a.isCapital,
        bcap = b.isCapital;

    if ((acap && bcap) || (!acap && !bcap)) {
      return comparePopulation(a, b);
    } else if (acap) {
      return -1;
    } else if (bcap) {
      return 1;
    }

    return comparePopulation(a, b);
  }

  // Sort by largest MMI first
  cities.sort(compareMmi);
  // Take up to first 6-largest MMI
  Array.prototype.push.apply(sortedCities, cities.splice(0, 6));

  // Sort by capital/population
  cities.sort(compareCapital);
  // Take up to first 5-capitals
  while (cities.length && cities[0].isCapital && sortedCities.length < 11) {
    sortedCities.push(cities.splice(0, 1)[0]);
  }

  // Sort by population
  cities.sort(comparePopulation);
  // Fill in any remaining selections based on population
  while (cities.length && sortedCities.length < 11) {
    sortedCities.push(cities.splice(0, 1)[0]);
  }

  // Sort each part by MMI and combine to a single list
  return sortedCities.sort(compareMmi).concat(cities.sort(compareMmi));
};

/**
 * Injects thousands number separator between each segment.
 *
 * @param number {Integer}
 *      The number to format.
 * @param separator {String} Optional.
 *      The string to use as a thousands separator. Default ','.
 *
 * @return {String}
 *      The number with thousands segments separator by separator.
 */
var _injectNumberSeparator = function (number, separator) {
  separator = separator || ',';
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, separator);
};

/**
 * Format the population for the city list display.
 *
 * @param population {Integer}
 *      The population value to format.
 *
 * @return {String}
 *      A formatted display value representing the population.
 */
var _formatCityPopulation = function (population) {
  if (population < 1000) {
    return '&lt;1 k';
  } else {
    return _injectNumberSeparator(Math.round(population / 1000)) + ' k';
  }
};

/**
 * Format population for the exposure table display.
 *
 * @param population {Integer}
 *      The population value to format.
 * @param incomplete {Boolean} Optional. Default: false
 *      True if the exposure contour corresponding to this population value
 *      extends beyond the mapped boundary, false otherwise.
 *
 * @return {String}
 *      A formated display value representing the population.
 */
var _formatExposurePopulation = function (population, incomplete) {
  var display = _injectNumberSeparator(Math.round(population / 1000)) + ' k';

  if (incomplete) {
    if (population === 0) {
        display = '--';
    }

    display += '*';
  }

  return display;
};


// ----------------------------------------------------------------------
// Parsing functions for each component piece of data
// ----------------------------------------------------------------------

/**
 * @param xml {Document}
 *      The XML document from which to parse alert information.
 *
 * @return {Object}
 *      An object of parsed alert information. Keyed by alert type.
 */
var _parseAlerts = function (xml) {
  var alert,
      type,
      bins,
      binIter,
      numBins,
      bin,
      alerts = xml.querySelectorAll('pager > alerts > alert'),
      alertIter = 0,
      numAlerts = alerts.length,
      data = {};

  for (; alertIter < numAlerts; alertIter++) {
    alert = alerts[alertIter];
    type = alert.getAttribute('type');

    data[alert.getAttribute('type')] = {
      level: alert.getAttribute('level'),
      units: alert.getAttribute('units'),
      bins: []
    };

    bins = alert.querySelectorAll('bin');
    for (binIter = 0, numBins = bins.length; binIter < numBins; binIter++) {
      bin = bins[binIter];

      data[type].bins.push({
        min: bin.getAttribute('min'),
        max: bin.getAttribute('max'),
        prob: bin.getAttribute('probability'),
        color: bin.getAttribute('color')
      });
    }
  }

  return data;
};

/**
 * @param xml {Document}
 *      The XML document from which to parse exposure information.
 *
 * @return {Array}
 *      An array of parsed exposure information.
 */
var _parseExposures = function (xml) {
  var exposure,
      binMin,
      binMax,
      population,
      onMap,
      sumPop,
      sumOnMap,
      exposures = xml.querySelectorAll('pager > exposure'),
      exposureIter = 0,
      numExposures = exposures.length,
      data = [];

  for (; exposureIter < numExposures; exposureIter++) {
    exposure = exposures[exposureIter];

    binMin = parseFloat(exposure.getAttribute('dmin'));
    binMax = parseFloat(exposure.getAttribute('dmax'));
    population = parseInt(exposure.getAttribute('exposure'), 10);
    onMap = (exposure.getAttribute('rangeInsideMap') === '1');

    data.push(Util.extend({},
      EXPOSURE_INFO[Math.round(binMin)],
      {
        min: binMin,
        max: binMax,
        population: population,
        onMap: onMap,
        populationDisplay: _formatExposurePopulation(population, !onMap),
      }
    ));
  }

  // Generally not required. If it becomes a problem, this will sort it out.
  data.sort(function (a, b) {
    return a.min - b.min;
  });

  // Combine bins II-III together
  if (data[1] && data[2]) {
    sumPop = data[1].population + data[2].population;
    sumOnMap = (data[1].onMap && data[2].onMap);

    data.splice(1, 2, {
      min: data[1].min,
      max: data[2].max,
      population: sumPop,
      onMap: sumOnMap,
      populationDisplay: _formatExposurePopulation(sumPop, !sumOnMap),
      perc:data[1].perc,
      resist:data[1].resist,
      vuln:data[1].vuln,
      label:data[1].label,
      css:data[1].css
    });
  }

  return data;
};

/**
 * @param xml {Document}
 *      The XML document from which to parse city information.
 *
 * @return {Array}
 *      An array of parsed city information.
 */
var _parseCities = function (xml) {
  var city,
      population,
      mmi,
      cities = xml.querySelectorAll('pager > city'),
      cityIter = 0,
      numCities = cities.length,
      data = [];

  for (; cityIter < numCities; cityIter++) {
    city = cities[cityIter];
    population = parseInt(city.getAttribute('population'), 10);
    mmi = parseFloat(city.getAttribute('mmi'));

    data.push(Util.extend({},
      EXPOSURE_INFO[Math.round(mmi)],
      {
        name: city.getAttribute('name'),
        latitude: parseFloat(city.getAttribute('lat')),
        longitude: parseFloat(city.getAttribute('lon')),
        population: population,
        populationDisplay: _formatCityPopulation(population),
        mmi: mmi,
        isCapital: (city.getAttribute('iscapital') === '1')
      }
    ));
  }

  // Sort so first 10 cities are "selected" cities
  data = _sortCities(data);

  return data;
};

/**
 * @param xml {Document}
 *      The XML document from which to parse comment information.
 *
 * @return {Object}
 *      An object containing parsed comment information. Keyed by comment
 *      type.
 */
var _parseComments = function (xml) {
  var comment,
      data = {};

  // TODO :: Check old comment parsing and make sure it remains consistent
  comment = xml.querySelectorAll('pager > structcomment');
  if (comment && comment.length) {
    data.structure = comment[0].textContent.trim();
  }

  comment = xml.querySelectorAll('pager > secondary_effects');
  if (comment && comment.length) {
    comment = comment[0].textContent.trim();
    if (comment !== '') {
      data.effects = comment;
    }
  }

  // TODO :: This is a cluster. PAGER team should sort out a better way to
  //         send comments of this nature.
  comment = xml.querySelectorAll('pager > impact_comment');
  if (comment && comment.length) {
    data.impact = comment[0].textContent.trim().split('#').reverse();
    if (data.impact[0].indexOf('economic') !== -1) {
      data.impact.reverse();
    }
  }

  return data;
};


// ----------------------------------------------------------------------
// Return the parser object with API methods
// ----------------------------------------------------------------------

var PagerXmlParser = {
  /**
   * @return {String}
   *      The version identifier for which this parser is compatible.
   */
  version: function () {
    return XML_VERSION_STRING;
  },

  /**
   * Parses an XML string/object into an object with PAGER information.
   *
   * @return {Object}
   *      An object containing PAGER information.
   */
  parse: function (xml) {
    var domParser;

    if (typeof xml === 'string') {
      domParser = new DOMParser();
      xml = domParser.parseFromString(xml, 'application/xml');
    }

    return {
      alerts: _parseAlerts(xml),
      exposures: _parseExposures(xml),
      cities: _parseCities(xml),
      comments: _parseComments(xml)
    };
  }
};


module.exports = PagerXmlParser;
