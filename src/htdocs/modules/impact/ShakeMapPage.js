'use strict';

var Accordion = require('accordion/Accordion'),
    Attribution = require('base/Attribution'),
    Formatter = require('base/Formatter'),
    ImpactUtil = require('base/ImpactUtil'),
    ProductSummarizer = require('base/ProductSummarizer'),
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
  suffix: 'download/stationlist.json'
};

var FLAG_DESCRIPTIONS = {
  'M': 'Manually flagged',
  'T': 'Outlier',
  'G': 'Glitch (clipped or below noise)',
  'I': 'Incomplete time series',
  'N': 'Not in list of known stations'
};


/**
 * Construct a new ShakeMapPage.
 *
 * @param options {Object}
 *        page options.
 */
var ShakeMapPage = function (options) {
  this._options = Util.extend({}, DEFAULTS, options);
  this._formatter = new Formatter();
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
  var el = document.createElement('div'),
      tablistDiv,
      shakemap;

  shakemap = this._shakemap = product;

  el.classList.add('shakemap');
  el.innerHTML = '<small class="attribution">Data Source ' +
      Attribution.getContributorReference(product.source) +
      '</small><div class="shakemap-tablist"></div>';
  tablistDiv = el.querySelector('.shakemap-tablist');

  if (shakemap.status.toUpperCase() === 'DELETE') {
    tablistDiv.innerHTML = '<p class="alert info">Product Deleted</p>';
  } else {
    // Build TabList with all of the shakemap images
    this._tablist = new TabList({
      el: tablistDiv,
      tabPosition: 'top',
      tabs: this._createTabListData(
        {
          contents: shakemap.contents
        })
    });
  }

  return el;
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
          '<p>Loading station list data from JSON, please wait...</p>';

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
            container.innerHTML = '<p class="alert error">' + errorMessage + '</p>';
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
  var file = this._shakemap.contents[STATION_LIST.suffix];

  if (!file) {
    return errback('No station list exists.');
  }

  // get station content and build the station list
  Xhr.ajax({
    url: file.url,
    success: function (data) {
      callback(data);
    },
    error: function (e /*, xhr*/) {
      errback('Unable to retreive the station list.');
      console.log(e.stack);
    }
  });
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
      station, pga, pgv, distance, romanNumeral, title, props;

      data = data.features;

  if (data.length === 0) {
    return '<p>No station data available at this time.</p>';
  }

  data.sort(ImpactUtil.sortByDistance);

  for (var i = 0; i < data.length; i++) {
    station = data[i];
    props = station.properties;

    pga = props.pga;
    pgv = props.pgv;


    pgv = (pgv !== null) ? pgv.toFixed(3) : '&ndash;';
    pga = (pga !== null) ? pga.toFixed(3) : '&ndash;';

    distance = props.distance.toFixed(1);

    romanNumeral = ImpactUtil.translateMmi(props.intensity);

    // Do not repeat the zip code if it's already part of the name
    if (props.name.indexOf('ZIP Code') === -1) {
      title = props.code + '<small>' + props.name + '</small>';
    } else {
      title = props.name;
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
            '<span>', pga ,'</span>',
            '<abbr title="Maximum Horizontal Peak Ground Acceleration (%g)">',
              'pga',
            '</abbr>',
          '</li>',
          '<li>',
            '<span>', pgv ,'</span>',
            '<abbr title="Maximum Horizontal Peak Ground Velocity (cm/s)">',
              'pgv',
            '</abbr>',
          '</li>',
          '<li>',
            '<span>', distance , ' km','</span>',
            '<abbr title="Distance (km)">dist</abbr>',
          '</li>',
        '</ul>',
        '<a class="accordion-toggle" data-id="', i ,'">Details</a>',
        this._buildStationDetails(station),
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
ShakeMapPage.prototype._buildStationDetails = function (feature) {
  var props;

  props = feature.properties;

  return [
      '<div class="accordion-content">',
        '<dl class="station-metadata vertical">',
          '<dt class="station-metadata-type">Type</dt>',
            '<dd class="station-metadata-type">',
              (props.instrumentType||'&ndash;'),
            '</dd>',
          '<dt class="station-metadata-location">Location</dt>',
            '<dd class="station-metadata-location">',
              this._formatLocation(feature),
            '</dd>',
          '<dt class="station-metadata-source">Source</dt>',
            '<dd class="station-metadata-source">', (props.source || '&ndash;'), '</dd>',
          '<dt class="station-metadata-intensity">Intensity</dt>',
            '<dd class="station-metadata-intensity">',
              this._formatter.number(props.intensity, 1, '&ndash;'),
            '</dd>',
        '</dl>',
        this._createChannelTable(props.channels),
      '</div>'
    ].join('');
};

ShakeMapPage.prototype._formatLocation = function (feature) {
  return ((feature.properties.location) ?
      (feature.properties.location + '<br/>') : '') + ' (' +
      feature.geometry.coordinates[1] + ', ' +
      feature.geometry.coordinates[0] + ')';
};

ShakeMapPage.prototype._createChannelTable = function (channels) {
  var i = 0, numChannels = channels.length;

  var markup = [
    '<div class="horizontal-scrolling">',
    '<table class="station-channels-list">',
      '<thead>',
        '<tr>',
          '<th scope="col" class="station-channels-list-name">name</th>',
          '<th scope="col" class="station-channels-list-pga">pga (%g)</th>',
          '<th scope="col" class="station-channels-list-pgv">pgv (cm/s)</th>',
          '<th scope="col" class="station-channels-list-psa03">psa03 (%g)</th>',
          '<th scope="col" class="station-channels-list-psa10">psa10 (%g)</th>',
          '<th scope="col" class="station-channels-list-psa30">psa30 (%g)</th>',
        '</tr>',
      '</thead>',
      '<tbody>'
  ];

  for (; i < numChannels; i++) {
    markup.push(this._createChannelRow(channels[i]));
  }

  markup.push('</tbody></table></div>');

  return markup.join('');
};

ShakeMapPage.prototype._createAmplitudesObject = function (amplitudes) {
  var amp = {},
      i,
      len = amplitudes.length,
      amplitude = null;

  for (i = 0; i < len; i++) {
    amplitude = amplitudes[i];
    amp[amplitude.name] = amplitude;
  }

  return amp;
};

ShakeMapPage.prototype._createChannelRow = function (channel) {
  var amplitude = this._createAmplitudesObject(channel.amplitudes);

  return [
    '<tr>',
      '<th scope="row" class="station-channel-name">',
        channel.name,
      '</th>',
      '<td class="station-channel-pga">',
      this._formatComponent(amplitude.pga),
      '</td>',
      '<td class="station-channel-pgv">',
      this._formatComponent(amplitude.pgv),
      '</td>',
      '<td class="station-channel-psa03">',
        this._formatComponent(amplitude.psa03),
      '</td>',
      '<td class="station-channel-psa10">',
        this._formatComponent(amplitude.psa10),
      '</td>',
      '<td class="station-channel-psa30">',
        this._formatComponent(amplitude.psa30),
      '</td>',
    '</tr>'
  ].join('');
};

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
        content.push('<abbr title="' + FLAG_DESCRIPTIONS[flag] + '">(' +
            flag + ')</abbr>');
      } else {
        content.push('(' + flag + ')');
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
 * Sets up summary info for Shakemap events with 2 or more events
 */
ShakeMapPage.prototype._getSummaryMarkup = function (product) {
  return ProductSummarizer.getShakeMapSummary(product);
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
