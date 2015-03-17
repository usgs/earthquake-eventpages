'use strict';

var Accordion = require('accordion/Accordion'),
    Attribution = require('base/Attribution'),
    ImpactUtil = require('base/ImpactUtil'),
    SummaryDetailsPage = require('base/SummaryDetailsPage'),
    TabList = require('tablist/TabList'),
    Util = require('util/Util'),
    Xhr = require('util/Xhr');


var DEFAULTS = {
  productTypes: ['shakemap'],
  hash: 'shakemap'
};

var MAP_IMAGES = [
  {
    title:'Intensity',
    suffix:'download/intensity.jpg'
  },
  {
    title:'PGA (%g)',
    suffix:'download/pga.jpg'
  },
  {
    title:'PGV (cm/s)',
    suffix:'download/pgv.jpg'
  },
  {
    title:'PSA 0.3s (%g)',
    suffix:'download/psa03.jpg'
  },
  {
    title:'PSA 1.0s (%g)',
    suffix:'download/psa10.jpg'
  },
  {
    title:'PSA 3.0s (%g)',
    suffix:'download/psa30.jpg'
  },
  {
    title:'Uncertainty',
    suffix:'download/sd.jpg'
  }
];

var STATION_LIST = {
  title: 'Station List',
  suffix: 'download/stationlist.xml'
};

var FLAG_DESCRIPTIONS = {
  'M': 'Manually flagged',
  'T': 'Outlier',
  'G': 'Glitch (clipped or below noise)',
  'I': 'Incomplete time series',
  'N': 'Not in list of known stations'
};

/**
 * Uses the intensity map as the thumbnail.
 * Sets alt tag for thumbnail image
 */
var SUMMARY_THUMBNAIL = 'download/intensity.jpg',
    THUMBNAIL_ALT = 'Shakemap Intensity Map';


/**
 * Construct a new ShakeMapPage.
 *
 * @param options {Object}
 *        page options.
 */
var ShakeMapPage = function (options) {
  this._options = Util.extend({}, DEFAULTS, options);
  this._tablist = null;
  this._shakemap = null;
  this._eventConfig = options.eventConfig;
  SummaryDetailsPage.call(this, this._options);
};

// extend SummaryDetailsPage.
ShakeMapPage.prototype = Object.create(SummaryDetailsPage.prototype);

/**
 * Clean up event bindings.
 *
 */
ShakeMapPage.prototype.destroy = function () {
  if (this._tabList) {
    this._tabList.destroy();
    this._tablist = null;
  }
  this._shakemap = null;
  this._stations = null;
  SummaryDetailsPage.prototype.destroy.call(this);
};

// this is not needed anymore
ShakeMapPage.prototype.getDetailsContent = function (product) {
  var tablistDiv = document.createElement('div'),
      shakemap;

  this._content.innerHTML = '<small class="attribution">Data Source ' +
      Attribution.getContributorReference(product.source) +
      '</small>';

  tablistDiv.className = 'shakemap-tablist';
  shakemap = this._shakemap = product;

  // Build TabList with all of the shakemap images
  this._tablist = new TabList({
    el: this._content.appendChild(tablistDiv),
    tabPosition: 'top',
    tabs: this._createTabListData(
      {
        contents: shakemap.contents
      })
  });
};
// end

/**
 * Generate array of tab content for tablist
 *
 * @param  {object} options,
 *         shakemap downloadable contents.
 *
 * @return {array}
 *         array of tablist objects including a tab title and content markup.
 */
ShakeMapPage.prototype._createTabListData = function (options) {
  var contents = options.contents,
      tablist = [],
      imageName,
      image;

  if (contents === null) {
    return tablist;
  }

  for (var i = 0; i < MAP_IMAGES.length; i++) {
    image = MAP_IMAGES[i];
    imageName = image.suffix;

    if (contents.hasOwnProperty(imageName)) {
      tablist.push({
        title: image.title,
        content: this._createTabListImage(contents[imageName].url)
      });
    }
  }

  // if stationlist exists, append to tablist
  if (contents[STATION_LIST.suffix]) {
    tablist.push(this._addStationList());
  }

  return tablist;
};

/**
 * Create combined link/image for tablist image with attached eventListener.
 *
 * @param  {string} url
 *         url to the image
 *
 * @return {element} link
 *         image link to interactive map.
**/
ShakeMapPage.prototype._createTabListImage = function (url) {
  var eventConfig = this._eventConfig;
  return function () {
    var link = document.createElement('a'),
        image = document.createElement('img');
    link.href = '#general_map';
    image.src = url;
    link.appendChild(image);
    link.addEventListener('click', function() {
      eventConfig.fromShakemap = true;
    });
    return link;
  };
};

/**
 * Build a list of stations from stationlist.xml, these stations have
 * an expandable details section. Add a station list tab to the the tablist.
 */
ShakeMapPage.prototype._addStationList = function () {
  var title = 'Station List',
      _this = this,
      container = document.createElement('div');

  // Build tab with station list
  var content = {
    'title': title,
    'content': function () {

      container.className = 'shakemap-stations';
      container.innerHTML =
          '<p>Loading station list data from XML, please wait...</p>';

      _this._getStationData(
          function (stations) {
            // add station list content
            container.innerHTML = _this._buildStationList(stations);
            // add click event to toggle details for stations
            new Accordion({
              el:container
            });
          },
          function (errorMessage) {
            container.innerHTML = '<p class="error">' + errorMessage + '</p>';
          }
      );
      // return panel content
      return container;
    },
    onDestroy: function () {
      container = null;
      _this = null;
    }
  };

  return content;
};

/**
 * Download the stationlist.xml
 *
 * @param  {Function} callback,
 *         callback function to display the station list markup
 *
 */
ShakeMapPage.prototype._getStationData = function (callback, errback) {
  var file = this._shakemap.contents[STATION_LIST.suffix],
      _this = this;

  if (!file) {
    return errback('No station list exists.');
  }

  // get station content and build the station list
  Xhr.ajax({
    url: file.url,
    success: function (data, xhr) {
      callback(_this._parseStationList(xhr.responseXML));
    },
    error: function () {
      errback('Error: Unable to retreive the station list.');
    }
  });
};

/**
 * Build array of station data, sort by distance
 *
 * @param  {object} xml,
 *         XML Dom object from the XHR response
 *
 * @return {array}
 *         array of station objects
 */
ShakeMapPage.prototype._parseStationList = function (xml) {
  var data = ImpactUtil.xmlToJson(xml),
      shakemapData = data['shakemap-data'][1],
      stations = this._stations = shakemapData.stationlist.station;

  if (!stations) {
    return [];
  }

  // sort by distance
  stations.sort(ImpactUtil.sortByDistance);

  return stations;
};

/**
 * Generate summary markup for station list.
 *
 * @param  {array} data,
 *         list of station objects.
 *
 * @return {string}
 *         HTML markup.
 */
ShakeMapPage.prototype._buildStationList = function (data) {
  var stations = [],
      station, acc, vel, dist, components, romanNumeral, title;

  if (data.length === 0) {
    return '<p>No station data available at this time.</p>';
  }

  for (var i = 0; i < data.length; i++) {
    station = data[i];
    components = station.comp;

    acc = this._findMaxValue(components, 'acc');
    vel = this._findMaxValue(components, 'vel');


    vel = (vel) ? vel.toFixed(3) : '&ndash;';
    acc = (acc) ? acc.toFixed(3) : '&ndash;';

    if (typeof station.dist === 'string') {
      dist = parseFloat(station.dist, 10);
    }

    dist = dist.toFixed(1);

    romanNumeral = ImpactUtil.translateMmi(station.intensity);

    // Do not repeat the zip code if it's already part of the name
    if (station.name.indexOf('ZIP Code') === -1) {
      title = station.code + '<small>' + station.name + '</small>';
    } else {
      title = station.name;
    }

    stations.push([
      '<div class="accordion accordion-section accordion-closed station">',
        '<h3>', title, '</h3>',
        '<ul class="station-summary">',
          '<li class="mmi mmi', romanNumeral, '">',
            '<span class="roman"><strong>', romanNumeral, '</strong></span>',
            '<abbr title="Modified Mercalli Intensity">mmi</abbr>',
          '</li>',
          '<li>',
            '<span>', vel ,'</span>',
            '<abbr title="Maximum Horizontal Peak Ground Velocity">',
              'pgv',
            '</abbr>',
          '</li>',
          '<li>',
            '<span>', acc ,'</span>',
            '<abbr title="Maximum Horizontal Peak Ground Acceleration">',
              'pga',
            '</abbr>',
          '</li>',
          '<li>',
            '<span>', dist ,'</span>',
            '<abbr title="Distance from Epicenter">dist</abbr>',
          '</li>',
        '</ul>',
        '<a class="accordion-toggle" data-id="', i ,'">Details</a>',
        this._buildStationDetails(i),
      '</div>'
    ].join(''));
  }

  return stations.join('');
};

/**
 * Generate details markup for station details. This is only called
 * when a station details section is expanded.
 *
 * @param  {string} index,
 *         a data-id value that identifies the station details
 *         section that was expanded on a click event.
 *
 * @return {string}
 *         HTML markup.
 */
ShakeMapPage.prototype._buildStationDetails = function (index) {
  var station,
      components;

  station = this._stations[index];
  components = station.comp;

  return [
      '<div class="accordion-content">',
        '<dl class="horizontal">',
          '<dt>Type: </dt>',
          '<dd>', (station.insttype === '') ? '--' : station.insttype ,'</dd>',
          '<dt>Location: </dt>',
          '<dd>(', station.lat, ', ', station.lon ,')</dd>',
          '<dt>Source: </dt>',
          '<dd>', station.source ,'</dd>',
          '<dt>Intensity: </dt>',
          '<dd>', station.intensity, '</dd>',
        '</dl>',
        this._buildComponentDetails(components),
      '</div>'
    ].join('');
};

/**
 * Called by _buildStationDetails, this finishes generating
 * markup for the station details section.
 *
 * @param  {array} components,
 *         station components for the station list.
 *
 * @return {string}
 *         HTML markup
 */
ShakeMapPage.prototype._buildComponentDetails = function (components) {
  var componentsMarkup = [],
      component;

  // check for null
  if (!components) {
    return;
  }

  // When one record exists components is an object not an array
  if(typeof components === 'object' && !(components instanceof Array)) {
    components = [components];
  }

  for(var i = 0; i < components.length; i++) {
    component = components[i];

    componentsMarkup.push([
      '<tr>',
        '<th scope="row">', component.name ,'</th>',
        '<td class="acc">', this._formatComponent(component.acc), '</td>',
        '<td class="vel">', this._formatComponent(component.vel), '</td>',
        '<td class="psa03">', this._formatComponent(component.psa03), '</td>',
        '<td class="psa10">', this._formatComponent(component.psa10), '</td>',
        '<td class="psa30">', this._formatComponent(component.psa30), '</td>',
      '</tr>'
    ].join(''));
  }

  return [
    '<table class="tabular responsive station-components">',
      '<thead>',
        '<tr>',
          '<th>name</th>',
          '<th>acc</th>',
          '<th>vel</th>',
          '<th>psa03</th>',
          '<th>psa10</th>',
          '<th>psa30</th>',
        '</tr>',
      '</thead>',
      '<tbody>',
          componentsMarkup.join(''),
      '</tbody>',
    '</table>'
  ].join('');
};

/**
 * Used to generate markup for component details based on the flag value.
 *
 * @param  {object} data,
 *         component value and component flag
 *         {
 *           value: 0.123,
 *           flag: 'G'
 *         }
 *
 * @return {string}
 *         HTML markup
 */
ShakeMapPage.prototype._formatComponent = function (data) {
  var content = [],
      flag,
      value;

  if (data) {
    flag = data.flag;
    value = data.value;

    // Add flag class for all non-zero flags
    if (flag && flag !== '0') {
      content.push('<span class="station-flag">');
      content.push(parseFloat(value, 10).toFixed(3));

      // display flag with title text
      if (FLAG_DESCRIPTIONS.hasOwnProperty(flag)) {
        content.push(' <abbr title="' + FLAG_DESCRIPTIONS[flag] + '">(' +
            flag + ')</abbr>');
      } else {
        content.push(' (' + flag + ')');
      }
      content.push('</span>');
    } else {
      content.push('<span>');
      content.push(parseFloat(value, 10).toFixed(3));
      content.push('</span>');
    }
  } else {
    content.push('<span>&ndash;</span>');
  }

  return content.join('');
};

/**
 * Find the max value in an array, used to determine max
 * values for station summary section.
 *
 * @param  {array} array,
 *         array of objects to parse through for max value.
 *
 * @param  {string} key,
 *         name of attribute to evaluate.
 *
 * @return {string}
 *         max value.
 */
ShakeMapPage.prototype._findMaxValue = function (array, key) {
  var values = [],
      value,
      item,
      i;

  // Only one value, convert to array
  if(typeof array === 'object' && !(array instanceof Array)) {
    array = [array];
  }

  for (i = 0; i < array.length; i++) {
    if (array[i].hasOwnProperty(key)){

      value = parseFloat(array[i][key].value, 10);

      if (isNaN(value)) {
        item = null;
      } else {
        item = array[i][key].value;
      }

      if (typeof item === 'string') {
        item = parseFloat(item, 10);
      }

      if (item) {
        values.push(item);
      }
    }
  }

  // otherwise infinity is computed as the max
  if(values.length === 0) {
    return null;
  }

  return Math.max.apply(null, values);
};

/**
 * Sets up summary info for Shakemap events with 2 or more events
 */
ShakeMapPage.prototype._getSummaryMarkup = function (product) {
  var properties = product.properties,
      contents = product.contents,
      maxmmi = properties.maxmmi;

  maxmmi = ImpactUtil.translateMmi(maxmmi);

  return '<ul>' +
      '<li class="image">' +
        '<img src="' + contents[SUMMARY_THUMBNAIL].url +
            '" alt="' + THUMBNAIL_ALT + '" />' +
      '</li>' +
      '<li class="mmi">' +
        '<span>' + maxmmi + '</span>' +
        '<abbr title="Modified Mercalli Intensity">MMI</abbr>' +
      '</li>' +
      '<li>' +
        '<span>' + Number(properties.magnitude).toFixed(1) + '</span>' +
        '<abbr title="Magnitude">Mag</abbr>' +
      '</li>' +
      '<li>' +
        this.getCatalogSummary(product) +
      '</li>' +
      '<li class="summary-hide">' +
        Attribution.getContributorReference(product.source) +
        '<abbr title="ShakeMap Data Source">Source</abbr>' +
      '</li>' +
    '</ul>';
};

ShakeMapPage.prototype._setFooterMarkup = function () {
  var links;

  links = document.createElement('section');
  links.innerHTML =
      '<h3>For More Information</h3>' +
      '<ul>' +
        '<li>' +
          '<a href="/research/shakemap/">' +
            'Scientific Background on ShakeMap' +
          '</a>' +
        '</li>' +
      '<ul>';

  this._footer.appendChild(links);

  SummaryDetailsPage.prototype._setFooterMarkup.apply(this);
};

module.exports = ShakeMapPage;
