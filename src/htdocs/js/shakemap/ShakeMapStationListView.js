'use strict';

var Accordion = require('accordion/Accordion'),
    ContentView = require('core/ContentView'),
    Formatter = require('core/Formatter'),
    Util = require('util/Util');

var _NO_CONTENT_MESSAGE = 'No stations list available.';

var FLAG_DESCRIPTIONS = {
  'M': 'Manually flagged',
  'T': 'Outlier',
  'G': 'Glitch (clipped or below noise)',
  'I': 'Incomplete time series',
  'N': 'Not in list of known stations'
};


/**
 * View for a Station List.
 *
 * @param options {Object}
 *
 * @param options.formatter {Formatter}
 *     The formatter object to use for formatting intrinsic values.
 */
var ShakeMapStationListView = function (options) {
  var _this,
      _initialize,

      _accordion,
      _formatter;

  options = options || {};
  _this = ContentView(options);

  _initialize = function(options) {
    _this.el.classList.add('shakemap-stations');
    _formatter = options.formatter || Formatter();
  };


  /**
   * Generate summary markup for station list.
   *
   * @param  data {array},
   *         list of station objects.
   *
   * @return {string}
   *         HTML markup.
   */
  _this.buildStationList = function (data) {
    var stations = [],
        station, pga, pgv, distance, romanNumeral, title, props;

        data = data.features;

    if (data.length === 0) {
      return '<p>No station data available at this time.</p>';
    }

    data.sort(_this.sortByDistance);

    for (var i = 0; i < data.length; i++) {
      station = data[i];
      props = station.properties;

      pga = props.pga;
      pgv = props.pgv;

      pgv = _formatter.number(pgv, 3);
      pga = _formatter.number(pga, 3);

      distance = _formatter.number(props.distance, 1);

      romanNumeral = _formatter.translateMmi(props.intensity);

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
          _this.buildStationDetails(station),
        '</div>'
      ].join(''));
    }

    return stations.join('');
  };

  /**
   * Generate details markup for station details. This is only called
   * when a station details section is expanded.
   *
   * @param  index {string},
   *         a data-id value that identifies the station details
   *         section that is expanded on a click event.
   *
   * @return {string}
   *         HTML markup.
   */
  _this.buildStationDetails = function (feature) {
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
                _this.formatLocation(feature),
              '</dd>',
            '<dt class="station-metadata-source">Source</dt>',
              '<dd class="station-metadata-source">',
                  (props.source || '&ndash;'), '</dd>',
            '<dt class="station-metadata-intensity">Intensity</dt>',
              '<dd class="station-metadata-intensity">',
                _formatter.number(props.intensity, 1, '&ndash;'),
              '</dd>',
          '</dl>',
          _this.createChannelTable(props.channels),
        '</div>'
      ].join('');
  };

  /**
   * Takes an array of amplitude objects from a channel, and creates
   *    a more user friendly amplitude object.
   * @param [objects] amplitudes
   *    An array of amplitude objects.
   *
   * @return {object}
   *    an object with a key object pair, where the key is the amplitude name.
   */
  _this.createAmplitudesObject = function (amplitudes) {
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

  /**
   * create the markup for a channel table.
   *
   * @params [objects] channels
   *
   * @return {string}
   *         HTML markup.
   */
  _this.createChannelTable = function (channels) {
    var i = 0, numChannels = channels.length;

    var markup = [
      '<div class="horizontal-scrolling">',
      '<table class="station-channels-list">',
        '<thead>',
          '<tr>',
            '<th scope="col" class="station-channels-list-name">name</th>',
            '<th scope="col" class="station-channels-list-pga">pga</th>',
            '<th scope="col" class="station-channels-list-pgv">pgv</th>',
            '<th scope="col" class="station-channels-list-psa03">psa03</th>',
            '<th scope="col" class="station-channels-list-psa10">psa10</th>',
            '<th scope="col" class="station-channels-list-psa30">psa30</th>',
          '</tr>',
        '</thead>',
        '<tbody>'
    ];

    for (; i < numChannels; i++) {
      markup.push(_this.createChannelRow(channels[i]));
    }

    markup.push('</tbody></table></div>');

    return markup.join('');
  };


  /**
   * create the markup for a channel row
   *
   * @params {objects} channel
   *
   * @return {string}
   *         HTML markup.
   */
  _this.createChannelRow = function (channel) {
    var amplitude = _this.createAmplitudesObject(channel.amplitudes);

    return [
      '<tr>',
        '<th scope="row" class="station-channel-name">',
          channel.name,
        '</th>',
        '<td class="station-channel-pga">',
          _this.formatComponent(amplitude.pga),
        '</td>',
        '<td class="station-channel-pgv">',
          _this.formatComponent(amplitude.pgv),
        '</td>',
        '<td class="station-channel-psa03">',
          _this.formatComponent(amplitude.psa03),
        '</td>',
        '<td class="station-channel-psa10">',
          _this.formatComponent(amplitude.psa10),
        '</td>',
        '<td class="station-channel-psa30">',
          _this.formatComponent(amplitude.psa30),
        '</td>',
      '</tr>'
    ].join('');
  };

  /**
   * Free references.
   */
  _this.destroy = Util.compose(function () {
    if (_accordion) {
      _accordion = null;
    }
    _this.formatter = null;
    _this.initialize = null;
    _this = null;
  }, _this.destroy);

  /**
   * format the component of a cell for a channel table.
   *
   * @params {object} data
   *
   * @returns {string}
   *         HTML markup.
   */
  _this.formatComponent = function (data) {
    var content = [],
        flag,
        value,
        units;

    if (data) {
      flag = data.flag;
      value = data.value;
      units = data.units;

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
        content.push('&nbsp'+ units);
        content.push('</span>');
      }
    } else {
      content.push('<span>&ndash;</span>');
    }

    return content.join('');
  };

  /**
   * Get the Lat, Long; swap position and encapsulate in parens.
   *
   * @param {object} feature
   *
   * @return {string}
   *         HTML markup.
   */
  _this.formatLocation = function (feature) {
    return ((feature.properties.location) ?
        (feature.properties.location + '<br/>') : '') + ' (' +
        feature.geometry.coordinates[1] + ', ' +
        feature.geometry.coordinates[0] + ')';
  };

  /**
   * Renders the default error message. Called if an error occurs during the
   * data fetch.
   *
   */
  _this.onError = function (/*status, xhr*/) {
    _this.el.innerHTML = _NO_CONTENT_MESSAGE;
  };

  /**
   * Renders the list of stations. Called when data is successfully fetched.
   *
   */
  _this.onSuccess = function (responseText/*, xhr*/) {
    _this.el.innerHTML = _this.buildStationList(responseText);
    _accordion = Accordion({
      el:_this.el
    });
  };

  /**
   * Sort by Distance
   *    Used by sort routines to determine which distance is greater.
   *
   * @params a {object}
   *         An object with distance in a properties sub object.
   * @params a {object}
   *         An object with distance in a properties sub object.
   *
   * @returns {number}
   *          The difference between the two distances.
   */
  _this.sortByDistance = function (a, b) {
    return parseFloat(a.properties.distance) - parseFloat(b.properties.distance);
  };


  _initialize(options);
  options = null;
  return _this;
};


ShakeMapStationListView.NO_CONTENT_MESSAGE = _NO_CONTENT_MESSAGE;

module.exports = ShakeMapStationListView;
