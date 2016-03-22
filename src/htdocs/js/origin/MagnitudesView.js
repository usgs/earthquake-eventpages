'use strict';


var Accordion = require('accordion/Accordion'),
    Attribution = require('core/Attribution'),
    ContentView = require('core/ContentView'),
    Formatter = require('core/Formatter'),
    Product = require('pdl/Product'),
    Quakeml = require('quakeml/Quakeml'),
    Util = require('util/Util');


var _DEFAULTS = {

};

var _NOT_REPORTED = '&ndash;';


var MagnitudesView = function (options) {
  var _this,
      _initialize,

      _accordion,
      _formatter,
      _product,
      _quakeml;


  options = Util.extend({}, _DEFAULTS, options);
  _this = ContentView(options);

  _initialize = function (options) {
    _formatter = options.formatter || Formatter();
    _product = options.product || Product();

    _accordion = Accordion({
      el: _this.el
    });
  };


  _this.destroy = Util.compose(function () {
    _accordion.destroy();
    // _quakeml.destroy(); // TODO :: Yes? No?

    _accordion = null;
    _formatter = null;
    _product = null;
    _quakeml = null;

    _initialize = null;
    _this = null;
  }, _this.destroy);

  _this.getStationTableHeaderRow = function () {
    return [
      '<tr>',
        '<th scope="col">',
          '<abbr title="Network Station Channel Location">Channel</abbr>',
        '</th>',
        '<th scope="col">Type</th>',
        '<th scope="col">Amplitude</th>',
        '<th scope="col">Period</th>',
        '<th scope="col">Status</th>',
        '<th scope="col">Magnitude</th>',
        '<th scope="col">Weight</th>',
      '</tr>'
    ].join('');
  };

  _this.getStationTableRow = function (contribution) {
    var amp,
        amplitude,
        mag,
        period,
        station,
        stationMagnitude,
        status,
        type,
        weight;

    stationMagnitude = contribution.stationMagnitude;
    amplitude = stationMagnitude.amplitude || {};

    station = stationMagnitude.waveformID || amplitude.waveformID;

    amp = _NOT_REPORTED;
    mag = stationMagnitude.mag.value || _NOT_REPORTED;
    period = _NOT_REPORTED;
    status = amplitude.evaluationMode || stationMagnitude.status || 'automatic';
    type = stationMagnitude.type;
    weight = contribution.weight;

    if (amplitude.genericAmplitude) {
      amp = amplitude.genericAmplitude.value + (amplitude.unit || '');
    }

    if (amplitude.period) {
      period = amplitude.period.value + ' s'; // TODO :: Formatter?
    }

    return [
      '<tr>',
        '<th scope="row">',
          station.networkCode,
          ' ', station.stationCode,
          ' ', station.channelCode,
          ' ', station.locationCode,
        '</th>',
        '<td class="type">', type , '</td>',
        '<td class="amplitude">', amp , '</td>',
        '<td class="period">', period , '</td>',
        '<td class="status">', status , '</td>',
        '<td class="magnitude">', mag , '</td>',
        '<td class="weight">', weight , '</td>',
      '</tr>'
    ].join('');
  };

  _this.getContributionsMarkup = function (contributions) {
    if (contributions.length === 0) {
      return '<p class="alert info">' +
          'No amplitudes contributed for this magnitude.</p>';
    } else {
      return [
        '<div class="horizontal-scrolling">',
          '<table class="magnitude-stations">',
            '<thead>',
              _this.getStationTableHeaderRow(),
            '</thead>',
            '<tbody>',
              contributions.reduce(function (markup, contribution) {
                markup.push(_this.getStationTableRow(contribution));
                return markup;
              }, []).join(''),
            '</tbody>',
          '</table>',
        '</div>'
      ].join('');
    }
  };

  _this.getErrorMarkup = function (error) {
    return [
      '<li>',
        '<span>', error, '</span>',
        '<abbr title="Magnitude Error">Error</abbr>',
      '</li>'
    ].join('');
  };

  _this.getMagnitudeMarkup = function (magnitude) {
    var contributions,
        error,
        source,
        stations,
        type,
        value;

    if (magnitude.creationInfo) {
      source = magnitude.creationInfo.agencyID;
    } else {
      source = _product.get('source');
    }

    contributions = magnitude.contributions || [];

    type = magnitude.type || _NOT_REPORTED;
    value = magnitude.mag.value || _NOT_REPORTED;
    error = magnitude.mag.uncertainty || _NOT_REPORTED;
    stations = magnitude.stationCount || _NOT_REPORTED;

    return [
      '<section class="accordion accordion-closed magnitude-view-item">',
        '<h3>', type, '</h3>',
        '<ul class="magnitude-summary">',
          _this.getValueMarkup(value),
          _this.getErrorMarkup(error),
          _this.getStationsMarkup(stations),
          _this.getSourceMarkup(source),
        '</ul>',
        '<a href="javascript:void(null);" class="accordion-toggle">Details</a>',
        '<div class="accordion-content">',
          _this.getContributionsMarkup(contributions),
        '</div>',
      '</section>'
    ].join('');
  };

  _this.getMagnitudesMarkup = function (magnitudes) {
    magnitudes = magnitudes || [];

    return magnitudes.reduce(function (markup, magnitude) {
      markup.push(_this.getMagnitudeMarkup(magnitude));
      return markup;
    }, []).join('');
  };

  _this.getSourceMarkup = function (source) {
    return [
      '<li>',
        Attribution.getContributorReference(source),
        '<abbr title="Magnitude Data Source">Source</abbr>',
      '</li>'
    ].join('');
  };

  _this.getStationsMarkup = function (stations) {
    return [
      '<li>',
        '<span>', stations, '</span>',
        '<abbr title="Number of Stations">Stations</abbr>',
      '</li>'
    ].join('');
  };

  _this.getValueMarkup = function (value) {
    return [
      '<li class="magnitude-value">',
        '<span><strong>',
          _formatter.magnitude(value),
        '</strong></span>',
        '<abbr title="Magnitude">Mag</abbr>',
      '</li>'
    ].join('');
  };

  _this.onError = function (/*status, xhr*/) {
    _this.el.innerHTML = '<p class="alert error">' +
        'Failed to load magnitude data.</p>';
  };

  _this.onSuccess = function (data/*, xhr*/) {
    _quakeml = Quakeml({xml: data});

    _this.render();

    // Let others know about our success so they don't have to download
    // and parse it themselves...
    _this.trigger('quakeml', _quakeml);
  };

  _this.render = function () {
    var magnitudes;

    if (!_quakeml) {
      // Don't have quakeml yet, try to get it
      _this.el.innerHTML = '<p>Loading content&hellip;</p>';
      _this.fetchData();
    } else {
      // Already have quakeml, render it
      magnitudes = _quakeml.getMagnitudes();

      if (magnitudes.length) {
        _this.el.innerHTML = _this.getMagnitudesMarkup(magnitudes);
      } else {
        _this.el.innerHTML = '<p class="alert info">' +
            'No magnitude data available.</p>';
      }
    }
  };


  _this.setQuakeml = function (quakeml) {
    _quakeml = quakeml;
  };


  _initialize(options);
  options = null;
  return _this;
};


module.exports = MagnitudesView;
