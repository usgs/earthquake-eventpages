'use strict';

var ContentView = require('core/ContentView');



/**
 * View for ShakeMap info.json content.
 */
var ShakeMapInfoView = function (options) {
  var _this;


  _this = ContentView(options);

  /**
   * Format a table for the shakemap info page.
   *
   * @param options {Object}
   * @param options.data {Object}
   *        keys are the same as in options.headers.
   *        values are usually strings/numbers, but may be objects when using
   *        a custom options.formatValue.
   * @param options.formatValue {Function(?)}
   *        custom formatter for data values.
   *        default returns value.
   * @param options.headers {Object}
   *        keys are the same as in options.data.
   *        values are String markup to use as <th> for value row.
   * @param options.includeUnknown {Boolean}
   *        default true.
   *        output keys and values even if keys do not appear in headers.
   * @param options.thead {String}
   *        optional, content added between <table> and <tbody> elements.
   *        when providing <thead> content, the tags must be included.
   */
  _this.formatTable = function (options) {
    var buf,
        data,
        formatValue,
        headers,
        includeUnknown,
        thead;

    // set defaults
    data = options.data || {};
    formatValue = options.formatValue || function (v) {
      return '<td>' + v + '</td>';
    };
    headers = options.headers || {};
    includeUnknown = ('includeUnknown' in options ?
        options.includeUnknown :
        true);
    thead = options.thead || '';

    buf = [];
    buf.push(
        '<div class="horizontal-scrolling">' +
        '<table>' +
        thead +
        '<tbody>');

    // rows that appear in headers object
    Object.keys(headers).forEach(function (key) {
      if (key in data) {
        buf.push(
            '<tr class="' + key + '">' +
              '<th scope="row">' + headers[key] + '</th>' +
              formatValue(data[key]) +
            '</tr>');
      }
    });

    // rows that appear in data object, but not headers
    if (includeUnknown) {
      Object.keys(data).forEach(function (key) {
        if (!(key in headers)) {
          buf.push(
              '<tr class="' + key + '">' +
                '<th scope="row">' + key + '</th>' +
                formatValue(data[key]) +
              '</tr>');
        }
      });
    }

    buf.push('</tbody>' +
        '</table>' +
        '</div>');

    return buf.join('');
  };

  /**
   * Error callback if unable to load info.json.
   */
  _this.onError = function () {
    _this.el.innerHTML = '<p class="alert error">' +
        'Unable to load ShakeMap information' +
        '</p>';
  };

  /**
   * Success callback, once info.json has loaded.
   */
  _this.onSuccess = function (json) {
    var el = _this.el;

    el.innerHTML =
        '<div class="row">' +
          '<div class="one-of-two column shakemapinfo-input"></div>' +
          '<div class="one-of-two column shakemapinfo-output"></div>' +
        '</div>' +
        '<div class="shakemapinfo-processing"></div>';

    _this.renderInput(json, el.querySelector('.shakemapinfo-input'));
    _this.renderProcessing(json, el.querySelector('.shakemapinfo-processing'));
    _this.renderOutput(json, el.querySelector('.shakemapinfo-output'));
  };

  /**
   * Render the input section of info.json.
   *
   * @param el {DOMElement}
   *        element where content should be rendered.
   */
  _this.renderInput = function (json, el) {
    var input;

    input = json.input;

    el.innerHTML =
        '<h2>Inputs</h2>' +
        '<h3>Event Information</h3>' +
        _this.formatTable({
          data: input.event_information,
          headers: {
            'event_description': 'Description',
            'event_id': 'ID',
            'magnitude': 'Magnitude',
            'depth': 'Depth',
            'longitude': 'Longitude',
            'latitude': 'Latitude',
            'origin_time': 'Origin Time',
            'src_mech': 'Mechanism',
            'mech_src': 'Mechanism source',
            'location': 'Location',
            'feregion': 'Flinn Engdahl region',
            'faultfiles': 'Fault file(s)',
            'fault_ref': 'Fault reference(s)',
            'tectonic_regime': 'Tectonic regime',
            'seismic_stations': 'Number of seismic stations',
            'intensity_observations': 'Number of DYFI stations'
          },
          includeUnknown: true
        });
  };

  /**
   * Render the output section of info.json.
   *
   * @param json {Object}
   *        parsed info.json content.
   * @param el {DOMElement}
   *        element where content should be rendered.
   */
  _this.renderOutput = function (json, el) {
    var buf,
        output;

    output = json.output;

    buf = [];
    buf.push('<h2>Output</h2>');

    buf.push('<h3>Ground Motion/Intensity Information</h3>' +
        _this.formatTable({
          data: output.ground_motions,
          formatValue: function (v) {
            return '<td>' + v.max_grid + '</td>' +
                '<td>' + v.max + '</td>' +
                '<td>' + v.bias + '</td>';
          },
          headers: {
            'intensity': 'Intensity',
            'pga': '<abbr title="Peak Ground Acceleration">PGA</abbr>',
            'pgv': '<abbr title="Peak Ground Velocity">PGV</abbr>',
            'psa03': '<abbr title="Pseudo Spectral Acceleration 0.3 second">PSA03</abbr>',
            'psa10': '<abbr title="Pseudo Spectral Acceleration 1.0 second">PSA10</abbr>',
            'psa30': '<abbr title="Pseudo Spectral Acceleration 3.0 second">PSA30</abbr>'
          },
          includeUnknown: true,
          thead:
              '<thead>' +
              '<tr>' +
              '<th scope="col">Type</th>' +
              '<th scope="col">Max value in grid</th>' +
              '<th scope="col">Max value on land</th>' +
              '<th scope="col">Bias</th>' +
              '</tr>' +
              '</thead>'
        }));

    buf.push('<h3>Map Information</h3>' +
        _this.formatTable({
          data: output.map_information,
          formatValue: function (v) {
            return '<td>' + v.latitude + '</td>' +
                '<td>' + v.longitude + '</td>';
          },
          headers: {
            'grid_span': 'Span',
            'grid_spacing': 'Grid Spacing',
            'grid_points': 'Number of points',
            'min': 'Min',
            'max': 'Max'
          },
          thead:
            '<thead>' +
            '<tr>' +
            '<th scope="col">Type</th>' +
            '<th scope="col">Latitude</th>' +
            '<th scope="col">Longitude</th>' +
            '</tr>' +
            '</thead>'
        }));

    buf.push('<h3>Uncertainty</h3>' +
        _this.formatTable({
          data: output.uncertainty,
          headers: {
            'mean_uncertainty_ratio': 'Mean of map uncertainty',
            'grade': 'Emperical ShakeMap Grade',
            'total_flagged_pgm': 'Flagged seismic stations',
            'total_flagged_mi': 'Flagged DYFI stations'
          }
        }));
    el.innerHTML = buf.join('');
  };

  /**
   * Render the processing section of info.json.
   *
   * @param json {Object}
   *        parsed info.json content.
   * @param el {DOMElement}
   *        element where content should be rendered.
   */
  _this.renderProcessing = function (json, el) {
    var buf,
        processing;

    processing = json.processing;

    buf = [];
    buf.push('<h2>Processing</h2><div class="row">');

    buf.push(
        '<div class="one-of-two column">' +
        '<h3>Ground Motion/Intensity Information</h3>' +
        _this.formatTable({
          data: processing.ground_motion_modules,
          formatValue: function (v) {
            return '<td>' + v.module + '</td>' +
                '<td>' + v.reference + '</td>';
          },
          headers: {
            'gmpe': '<abbr title="Ground Motion Prediction Equation">GMPE</abbr>',
            'ipe': '<abbr title="Intensity Prediction Equation">IPE</abbr>',
            'mi2pgm': '<abbr title="Ground Motion Intensity Conversion Equation">GMICE</abbr>',
            'pgm2mi': '<abbr title="Inverse Ground Motion Intensity Conversion Equation">IGMICE</abbr>',
            'directivity': 'Directivity',
            'basin_correction': 'Basin'
          },
          thead:
              '<thead>' +
              '<tr>' +
              '<th scope="col">Type</th>' +
              '<th scope="col">Module</th>' +
              '<th scope="col">Reference</th>' +
              '</tr>' +
              '</thead>'
        }) +
        '</div>');

    buf.push(
        '<div class="one-of-two column">' +
        '<h3>Miscellaneous</h3>' +
        _this.formatTable({
          data: processing.miscellaneous,
          headers: {
            'bias_log_amp': 'Used log amp to compute bias?',
            'bias_max_range': 'Maximum distance to include station in bias (km)',
            'bias_max_mag': 'Max magnitude to compute bias',
            'bias_min_bias': 'Min allowed bias',
            'outlier_max_mag': 'Maximum magnitude to flag outliers',
            'bias_norm': 'Norm of the bias (l1|l2)',
            'bias_min_stations': 'Min # of stations necessary to compute bias',
            'bias_max_bias': 'Max allowed bias',
            'outlier_deviation_level': 'Outlier level (# of std dev)',
            'median_dist': 'Median distance used'
          },
          includeUnknown: true
        }) +
        '</div>');

    buf.push(
        '<div class="one-of-two column">' +
        '<h3>ShakeMap Versions</h3>' +
        _this.formatTable({
          data: processing.shakemap_versions,
          headers: {
            'shakemap_revision': 'Code',
            'map_version': 'Map',
            'process_time': 'Date'
          },
          includeUnknown: true
        }) +
        '</div>');

    buf.push(
        '<div class="one-of-two column">' +
        '<h3>Site Response</h3>' +
        _this.formatTable({
          data: processing.site_response,
          headers: {
            'vs30default': 'Reference rock Vs30 (m/s)',
            'site_correction': 'Site correction applied'
          },
          includeUnknown: true
        }) +
        '</div>');

    buf.push(
        '<div class="one-of-two column">' +
        '<h3>ROI</h3>' +
        _this.formatTable({
          data: processing.roi,
          formatValue: function (v) {
            return '<td>' + v.roi + '</td>' +
                '<td>' + v.decay + '</td>';
          },
          headers: {
            'gm': 'Ground Motion',
            'i': 'Intensity'
          },
          thead:
              '<thead>' +
              '<tr>' +
              '<th scope="col">Type</th>' +
              '<th scope="col">ROI (km)</th>' +
              '<th scope="col">Observation Decay</th>' +
              '</tr>' +
              '</thead>'
        }) +
        '</div>');

        buf.push('</div>');
    el.innerHTML = buf.join('');
  };

  options = null;
  return _this;
};


module.exports = ShakeMapInfoView;
