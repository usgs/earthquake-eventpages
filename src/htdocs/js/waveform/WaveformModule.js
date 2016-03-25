'use strict';

var Module = require('core/Module'),
    Util = require('util/Util'),
    Xhr = require('util/Xhr');

var _DEFAULTS,
    _ID,
    _TITLE,
    _TYPES;

_DEFAULTS = {
  irisServiceUrl: 'http://service.iris.edu/fdsnws/event/1/query',
  irisSpudUrl:'http://www.iris.edu/spud/event/',
  irisWilberUrl:'http://www.iris.edu/wilber3/find_stations/',
  errorMessage: '<p class="alert error">Error finding waveform data</p>'
};
_ID = 'waveform';
_TITLE = 'Waveform Module';
_TYPES = ['origin'];


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

  _this.createScaffolding = function () {
    _this.el.classList.add('wave-form');
    _this.header.innerHTML = '<h3>Scientific - Waveforms</h3>';
    _this.content.innerHTML =
      '<div class="row">' +
        '<div class="column waveform-content"></div>' +
      '</div>';

    _waveformContentEl = _this.el.querySelector('.waveform-content');
  };

  _this.fetchData = function () {
    var latitude,
        longitude,
        search,
        summary,
        time;

    summary = _this.model.get('event').getSummary();

    //console.log(_this.model.get('event').getSummary());
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

    Xhr.ajax({
      url: _irisServiceUrl,
      data: search,
      success: _this.onSuccess,
      error: _this.onError,
    });
  };

  _this.onError = function () {
    _this.el.innerHTML = _errorMessage;
  };

  _this.onSuccess = function (data) {
    _eventId = _this.parseIrisEventId(data);

    if (_eventId !== -1) {
      _this.getIrisLinks(_eventId);
    } else {
      _this.onError();
    }
  };

  _this.parseIrisEventId = function (data) {
    return data.split('\n')[1].split('|')[0];
  };

  _this.getIrisLinks = function () {
    _waveformContentEl.innerHTML = [
      '<dl class="iris-products vertical">',
        '<dt>',
          '<a href="', _irisWilberUrl, _eventId, '" target="_blank">',
            'IRIS Seismic Waveform Data (Wilber 3)',
          '</a>',
        '</dt>',
        '<dd>',
          'Wilber 3 locates stations in operation at the time of the event,',
          ' allows users to filter stations, preview waveform data, and',
          ' view record section plots. Data can be downloaded in a',
          ' number of formats including <abbr title="Seismic Analysis',
          ' Code">SAC</abbr>, <abbr title="Standard for the Exchange of',
          ' Earthquake Data">SEED</abbr>, miniSEED and ASCII.',
        '</dd>',

        '<dt>',
          '<a href="', _irisSpudUrl, _eventId, '" target="_blank">',
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

  _this.render = function () {
    _this.createScaffolding();
    _this.fetchData();
  };

  _initialize(options);
  options = null;
  return _this;
};

WaveformModule.ID = _ID;
WaveformModule.TITLE = _TITLE;
WaveformModule.TYPES = _TYPES;

module.exports = WaveformModule;
