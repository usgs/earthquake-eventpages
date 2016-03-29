'use strict';

var Module = require('core/Module'),
    Util = require('util/Util'),
    Xhr = require('util/Xhr');

var _DEFAULTS,
    _ID,
    _TITLE,

    _hasContent;


_DEFAULTS = {
  irisServiceUrl: 'http://service.iris.edu/fdsnws/event/1/query',
  irisSpudUrl:'http://www.iris.edu/spud/event/',
  irisWilberUrl:'http://www.iris.edu/wilber3/find_stations/',
  errorMessage: '<p class="alert error">Error finding waveform data</p>'
};
_ID = 'waveform';
_TITLE = 'Waveforms';


_hasContent = function (eventPageModel) {
  var config;

  config = eventPageModel.get('config');
  return config.hasOwnProperty('SCENARIO_MODE') ?
      !config.SCENARIO_MODE : true;
};


/**
 * Waveform module
 *
 * @param options {object}
 *    url options
 */
var WaveformModule = function (options) {
  var _this,
      _initialize,

      _errorMessage,
      _eventId,
      _irisServiceUrl,
      _irisSpudUrl,
      _irisWilberUrl,
      _waveformContentEl;

  options = Util.extend({}, _DEFAULTS, options);
  _this = Module(options);

  _initialize = function () {
    _this.ID = _ID;
    _this.TITLE = _TITLE;

    _errorMessage = options.errorMessage;
    _irisServiceUrl = options.irisServiceUrl;
    _irisSpudUrl = options.irisSpudUrl;
    _irisWilberUrl = options.irisWilberUrl;

    _this.el.classList.add('wave-form');
  };

  _this.destroy = Util.compose(function () {
    _initialize = null;
    _this = null;

    _waveformContentEl = null;
    _irisWilberUrl= null;
    _irisSpudUrl = null;
    _irisServiceUrl = null;
    _eventId = null;
    _errorMessage = null;
  }, _this.destroy);

  /**
   * Gets the data.
   * @param search {object}
   *    Search parameters.
   */
  _this.fetchData = function (search) {
    Xhr.ajax({
      url: _irisServiceUrl,
      data: search,
      success: _this.onSuccess,
      error: _this.onError,
    });
  };

  /**
   * Gets search parameters from the model and creates search object
   */
  _this.getSearch = function () {
    var ev,
        latitude,
        longitude,
        search,
        summary,
        time;

    ev = _this.model.get('event');
    search = null;

    if (ev) {
      summary = ev.getSummary();
      latitude = summary.latitude;
      longitude = summary.longitude;
      time = Number(summary.time.getTime());
      // search parameters
      search = {
        'starttime': new Date(time - 16000).toISOString().replace('Z', ''),
        'endtime': new Date(time + 16000).toISOString().replace('Z', ''),
        'latitude': latitude,
        'longitude': longitude,
        'maxradius': 1,
        'format': 'text'
      };
    }

    return search;
  };

  /**
   * Shows default error message which can be changed.
   */
  _this.onError = function () {
    _this.el.innerHTML = _errorMessage;
  };

  /**
   * onSuccess is called when Xhr is successful and calls eventId if no event
   * is found. If an event is found it calls renderContent.
   * @param data {string}
   *    data in string format.
   */
  _this.onSuccess = function (data) {
    var eventId;

    eventId = _this.parseIrisEventId(data);

    if (!eventId) {
      _this.onError();
      return;
    }

    _this.renderContent(eventId);
  };

  /**
   * Gets eventId from data
   * @param {string}
   *    data in string format.
   */
  _this.parseIrisEventId = function (data) {
    return data.split('\n')[1].split('|')[0];
  };

  /**
   * Called when the model changes
   */
  _this.render = function () {
    var search;

    _this.header.innerHTML = '<h3>Waveforms</h3>' +
        '<a class="back-to-summary-link"' +
        ' href="#scientific">Back to Scientific Summary</a>';

    search = _this.getSearch();

    if (search === null) {
      _this.onError();
    } else {
      _this.fetchData(search);
    }
  };

  /**
   * Renders main content and adds urls.
   * @param eventId {string}
   *    The event id parsed from data.
   */
  _this.renderContent = function (eventId) {
    _this.content.innerHTML = [
      '<dl class="iris-products vertical">',
        '<dt>',
          '<a href="', _irisWilberUrl, eventId, '" target="_blank">',
            'IRIS Seismic Waveform Data (Wilber 3)',
          '</a>',
        '</dt>',
        '<dd class="iris-waveforms">',
          'Wilber 3 locates stations in operation at the time of the event,',
          ' allows users to filter stations, preview waveform data, and',
          ' view record section plots. Data can be downloaded in a',
          ' number of formats including <abbr title="Seismic Analysis',
          ' Code">SAC</abbr>, <abbr title="Standard for the Exchange of',
          ' Earthquake Data">SEED</abbr>, miniSEED and ASCII.',
        '</dd>',

        '<dt>',
          '<a href="', _irisSpudUrl, eventId, '" target="_blank">',
            'IRIS Searchable Product Depository (SPUD) Event Page',
          '</a>',
        '</dt>',
        '<dd>',
          'SPUD is the IRIS DMC\'s primary data product management system.',
          ' Complementing the DMC\'s SEED and assembled data archives,',
          ' which contain time series recordings, the SPUD system',
          ' primarily contains derivative data products of other types',
          ' (images, movies, etc.) created either at the DMC or by members',
          ' of the community.',
        '</dd>',
      '</dl>'
    ].join('');
  };

  _initialize(options);
  options = null;
  return _this;
};

WaveformModule.ID = _ID;
WaveformModule.TITLE = _TITLE;
WaveformModule.hasContent = _hasContent;

module.exports = WaveformModule;
