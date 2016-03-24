'use strict';


var ContentView = require('core/ContentView'),
    Formatter = require('core/Formatter'),
    Util = require('util/Util');


var _DEFAULTS = {
  empty: '&ndash;',
  formatter: null
};


/**
 * View for ShakeMap info.json content.
 *
 * @param options {Object}
 * @param options.empty {String}
 *     value to display if a field is missing or empty.
 *     default '&ndash;'.
 * @param options.formatter {Formatter}
 *     formatting object.
 */
var ShakeMapInfoView = function (options) {
  var _this,
      _initialize,

      _empty,
      _formatter;


  _this = ContentView(options);

  _initialize = function (options) {
    options = Util.extend({}, _DEFAULTS, options);
    _empty = options.empty;
    _formatter = options.formatter || Formatter();
  };


  /**
   * Format one ground motion row.
   *
   * @param gm {Object}
   *     ground motion object.
   * @param label {String}
   *     markup for `th` element.
   * @return {String}
   *     markup for table row.
   */
  _this.formatGroundMotion = function (gm, label) {
    var units;

    units = gm.units;

    return '<tr>' +
        '<th scope="row">' + label + '</th>' +
        '<td>' + gm.max_grid + ' ' + units + '</td>' +
        '<td>' + gm.max + ' ' + units + '</td>' +
        '<td>' + gm.bias + '</td>' +
        '</tr>';
  };

  /**
   * Format the output ground motions table.
   *
   * @param groundMotions {Object}
   *     the output ground motions section of info.json.
   * @return {String}
   *     markup for output ground motions table.
   */
  _this.formatOutputGroundMotions = function (groundMotions) {
    var buf,
        headers;

    buf = [];
    buf.push('<h3>Ground Motion/Intensity Information</h3>');

    buf.push(
        '<div class="horizontal-scrolling">' +
        '<table>' +
        '<thead>' +
          '<tr>' +
            '<th scope="col">Type</th>' +
            '<th scope="col">Max value in grid</th>' +
            '<th scope="col">Max value on land</th>' +
            '<th scope="col">Bias</th>' +
          '</tr>' +
        '</thead>' +
        '<tbody>');

    headers = {
      'intensity': 'Intensity',
      'pga': '<abbr title="Peak Ground Acceleration">PGA</abbr>',
      'pgv': '<abbr title="Peak Ground Velocity">PGV</abbr>',
      'psa03': '<abbr title="Pseudo Spectral Acceleration 0.3 s">' +
          'PSA03</abbr>',
      'psa10': '<abbr title="Pseudo Spectral Acceleration 1.0 s">' +
          'PSA10</abbr>',
      'psa30': '<abbr title="Pseudo Spectral Acceleration 3.0 s">' +
          'PSA30</abbr>'
    };

    Object.keys(headers).forEach(function (key) {
      if (key in groundMotions) {
        buf.push(_this.formatGroundMotion(groundMotions[key], headers[key]));
      }
    });

    Object.keys(groundMotions).forEach(function (key) {
      if (!(key in headers)) {
        // unknown groundMotion
        buf.push(_this.formatGroundMotion(groundMotions[key], key));
      }
    });

    buf.push(
        '</tbody>' +
        '</table>' +
        '</div>');

    return buf.join('');
  };

  /**
   * Format the output map information table.
   *
   * @param mapInformation {Object}
   *     the output map information section of info.json.
   * @return {String}
   *     markup for the map information table.
   */
  _this.formatOutputMapInformation = function (mapInformation) {
    var gridPoints,
        gridSpan,
        gridSpacing,
        max,
        min;

    gridPoints = mapInformation.grid_points;
    gridSpan = mapInformation.grid_span;
    gridSpacing = mapInformation.grid_spacing;
    max = mapInformation.max;
    min = mapInformation.min;

    return '<h3>Map Information</h3>' +
        '<div class="horizontal-scrolling">' +
        '<table>' +
          '<thead>' +
          '<tr>' +
            '<th scope="col">Type</th>' +
            '<th scope="col">Latitude</th>' +
            '<th scope="col">Longitude</th>' +
          '</tr>' +
          '</thead>' +
          '<tbody>' +
          '<tr>' +
            '<th scope="row">Span</th>' +
            '<td>' + gridSpan.latitude + '&deg;</td>' +
            '<td>' + gridSpan.longitude + '&deg;</td>' +
          '</tr>' +
          '<tr>' +
            '<th scope="row">Grid Spacing</th>' +
            '<td>' + gridSpacing.latitude + ' km</td>' +
            '<td>' + gridSpacing.longitude + ' km</td>' +
          '</tr>' +
          '<tr>' +
            '<th scope="row">Number of points</th>' +
            '<td>' + gridPoints.latitude + '</td>' +
            '<td>' + gridPoints.longitude + '</td>' +
          '</tr>' +
          '<tr>' +
            '<th scope="row">Min</th>' +
            '<td>' + _formatter.latitude(min.latitude) + '</td>' +
            '<td>' + _formatter.longitude(min.longitude) + '</td>' +
          '</tr>' +
          '<tr>' +
            '<th scope="row">Max</th>' +
            '<td>' + _formatter.latitude(max.latitude) + '</td>' +
            '<td>' + _formatter.longitude(max.longitude) + '</td>' +
          '</tr>' +
          '</tbody>' +
        '</table>' +
        '</div>';
  };

  /**
   * Format the processing ground motions table.
   *
   * @param groundMotions {Object}
   *     the processing ground motions section of info.json.
   * @return {String}
   *     markup for processing ground motions table.
   */
  _this.formatProcessingGroundMotions = function (groundMotions) {
    var buf,
        headers,
        formatGroundMotion;

    buf = [];
    buf.push('<h3>Ground Motion/Intensity Information</h3>');

    buf.push(
        '<div class="horizontal-scrolling">' +
        '<table>' +
          '<thead>' +
            '<tr>' +
            '<th scope="col">Type</th>' +
            '<th scope="col">Module</th>' +
            '<th scope="col">Reference</th>' +
            '</tr>' +
          '</thead>' +
          '<tbody>');

    /**
     * Format one ground motion row.
     *
     * @param gm {Object}
     *     ground motion object.
     * @param label {String}
     *     markup for `th` element.
     * @return {String}
     *     markup for table row.
     */
    formatGroundMotion = function (gm, label) {
      var units;

      units = gm.units;

      return '<tr>' +
          '<th scope="row">' + label + '</th>' +
          '<td>' + gm.module + '</td>' +
          '<td>' + gm.reference + '</td>' +
        '</tr>';
    };

    headers = {
      'gmpe': '<abbr title="Ground Motion Prediction Equation">GMPE</abbr>',
      'ipe': '<abbr title="Intensity Prediction Equation">IPE</abbr>',
      'mi2pgm': '<abbr title="Ground Motion Intensity Conversion Equation">' +
          'GMICE</abbr>',
      'pgm2mi':
          '<abbr title="Inverse Ground Motion Intensity Conversion Equation">' +
          'IGMICE</abbr>',
      'directivity': 'Directivity',
      'basin_correction': 'Basin'
    };

    Object.keys(headers).forEach(function (key) {
      if (key in groundMotions) {
        buf.push(formatGroundMotion(groundMotions[key], headers[key]));
      }
    });
    Object.keys(groundMotions).forEach(function (key) {
      if (!(key in headers)) {
        // unknown groundMotion
        buf.push(formatGroundMotion(groundMotions[key], key));
      }
    });

    buf.push('</tbody>' +
        '</table>' +
      '</div>');

    return buf.join('');
  };

  /**
   * Format the processing ground motions table.
   *
   * @param rois {Object}
   *     the processing rois section of info.json.
   * @return {String}
   *     markup for processing rois table.
   */
  _this.formatProcessingRois = function (rois) {
    var groundMotion,
        intensity;

    groundMotion = rois.gm;
    intensity = rois.intensity;

    return '<h3>ROI</h3>' +
      '<div class="horizontal-scrolling">' +
        '<table>' +
          '<thead>' +
            '<tr>' +
              '<th scope="col">Type</th>' +
              '<th scope="col">ROI</th>' +
              '<th scope="col">Observation Decay</th>' +
            '</tr>' +
          '</thead>' +
          '<tbody>' +
            '<tr>' +
              '<th scope="row">Ground Motion</th>' +
              '<td>' + groundMotion.roi + ' km</td>' +
              '<td>' + groundMotion.decay + '</td>' +
            '</tr>' +
            '<tr>' +
              '<th scope="row">Intensity</th>' +
              '<td>' + intensity.roi + ' km</td>' +
              '<td>' + intensity.decay + '</td>' +
            '</tr>' +
          '</tbody>' +
        '</table>' +
      '</div>';
  };

  /**
   * Error callback if unable to load info.json.
   */
  _this.onError = function () {
    _this.el.innerHTML = '<p class="alert error">' +
        'Unable to load ShakeMap information' +
      '</p>';
    console.log(arguments);
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
    var buf,
        info,
        input;

    input = json.input;

    buf = [];
    buf.push('<h2>Input</h2>');

    info = input.event_information;
    buf.push('<h3>Event Information</h3>' +
      '<div class="horizontal-scrolling">' +
        '<table>' +
          '<tbody>' +
            '<tr>' +
              '<th scope="row">Description</th>' +
              '<td>' + info.event_description + '</td>' +
            '</tr>' +
            '<tr>' +
              '<th scope="row">ID</th>' +
              '<td>' + info.event_id + '</td>' +
            '</tr>' +
            '<tr>' +
              '<th scope="row">Magnitude</th>' +
              '<td>' + _formatter.magnitude(info.magnitude) + '</td>' +
            '</tr>' +
            '<tr>' +
              '<th scope="row">Depth</th>' +
              '<td>' + _formatter.depth(info.depth, 'km') + '</td>' +
            '</tr>' +
            '<tr>' +
              '<th scope="row">Longitude</th>' +
              '<td>' + _formatter.longitude(info.longitude) + '</td>' +
            '</tr>' +
            '<tr>' +
              '<th scope="row">Latitude</th>' +
              '<td>' + _formatter.latitude(info.latitude) + '</td>' +
            '</tr>' +
            '<tr>' +
              '<th scope="row">Origin Time</th>' +
              '<td>' + info.origin_time + '</td>' +
            '</tr>' +
            '<tr>' +
              '<th scope="row">Mechanism</th>' +
              '<td>' + (info.src_mech || _empty) + '</td>' +
            '</tr>' +
            '<tr>' +
              '<th scope="row">Mechanism source</th>' +
              '<td>' + (info.mech_src || _empty) + '</td>' +
            '</tr>' +
            '<tr>' +
              '<th scope="row">Location</th>' +
              '<td>' + info.location + '</td>' +
            '</tr>' +
            '<tr>' +
              '<th scope="row">Flinn Engdahl region</th>' +
              '<td>' + info.feregion + '</td>' +
            '</tr>' +
            '<tr>' +
              '<th scope="row">Fault file(s)</th>' +
              '<td>' + (info.faultfiles || _empty) + '</td>' +
            '</tr>' +
            '<tr>' +
              '<th scope="row">Fault reference(s)</th>' +
              '<td>' + (info.fault_ref || _empty) + '</td>' +
            '</tr>' +
            '<tr>' +
              '<th scope="row">Tectonic regime</th>' +
              '<td>' + (info.tectonic_regime || _empty) + '</td>' +
            '</tr>' +
            '<tr>' +
              '<th scope="row">Number of seismic stations</th>' +
              '<td>' + info.seismic_stations + '</td>' +
            '</tr>' +
            '<tr>' +
              '<th scope="row">Number of DYFI stations</th>' +
              '<td>' + info.intensity_observations + '</td>' +
            '</tr>' +
          '</tbody>' +
        '</table>' +
      '</div>');

    el.innerHTML = buf.join('');
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
        output,
        uncertainty;

    output = json.output;

    buf = [];
    buf.push('<h2>Output</h2>');
    buf.push(_this.formatOutputGroundMotions(output.ground_motions));
    buf.push(_this.formatOutputMapInformation(output.map_information));

    uncertainty = output.uncertainty;
    buf.push('<h3>Uncertainty</h3>' +
      '<div class="horizontal-scrolling">' +
        '<table>' +
          '<tbody>' +
            '<tr>' +
              '<th scope="row">Mean of map uncertainty</th>' +
              '<td>' + uncertainty.mean_uncertainty_ratio + '</td>' +
            '</tr>' +
            '<tr>' +
              '<th scope="row">Emperical ShakeMap grade</th>' +
              '<td>' + uncertainty.grade + '</td>' +
            '</tr>' +
            '<tr>' +
              '<th scope="row">Flagged seismic stations</th>' +
              '<td>' + uncertainty.total_flagged_pgm + '</td>' +
            '</tr>' +
            '<tr>' +
              '<th scope="row">Flagged DYFI stations</th>' +
              '<td>' + uncertainty.total_flagged_mi + '</td>' +
            '</tr>' +
          '</tbody>' +
        '</table>' +
      '</div>');

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
        misc,
        processing,
        response,
        versions;

    processing = json.processing;

    buf = [];
    buf.push('<h2>Processing</h2>' +
        '<div class="row">');

    buf.push('<div class="one-of-two column">' +
        _this.formatProcessingGroundMotions(processing.ground_motion_modules) +
      '</div>');

    misc = processing.miscellaneous;
    buf.push(
      '<div class="one-of-two column">' +
        '<h3>Miscellaneous</h3>' +
        '<div class="horizontal-scrolling">' +
          '<table>' +
            '<tbody>' +
              '<tr>' +
                '<th scope="row">Used log amp to compute bias?</th>' +
                '<td>' + misc.bias_log_amp + '</td>' +
              '</tr>' +
              '<tr>' +
                '<th scope="row">' +
                  'Maximum distance to include station in bias' +
                '</th>' +
                '<td>' +
                  _formatter.distance(misc.bias_max_range, 'km') +
                '</td>' +
              '</tr>' +
              '<tr>' +
                '<th scope="row">Max magnitude to compute bias</th>' +
                '<td>' + _formatter.magnitude(misc.bias_max_mag) + '</td>' +
              '</tr>' +
              '<tr>' +
                '<th scope="row">Min allowed bias</th>' +
                '<td>' + (misc.bias_min_bias || _empty) + '</td>' +
              '</tr>' +
              '<tr>' +
                '<th scope="row">Maximum magnitude to flag outliers</th>' +
                '<td>' + _formatter.magnitude(misc.outlier_max_mag) + '</td>' +
              '</tr>' +
              '<tr>' +
                '<th scope="row">Norm of the bias</th>' +
                '<td>' + (misc.bias_norm || _empty) + '</td>' +
              '</tr>' +
              '<tr>' +
                '<th scope="row">' +
                  'Min # of stations necessary to compute bias' +
                '</th>' +
                '<td>' + (misc.bias_min_stations || _empty) + '</td>' +
              '</tr>' +
              '<tr>' +
                '<th scope="row">Max allowed bias</th>' +
                '<td>' + (misc.bias_max_bias || _empty) + '</td>' +
              '</tr>' +
              '<tr>' +
                '<th scope="row">Outlier level (# of std dev)</th>' +
                '<td>' + (misc.outlier_deviation_level || _empty) + '</td>' +
              '</tr>' +
              '<tr>' +
                '<th scope="row">Median distance used</th>' +
                '<td>' + misc.median_dist + '</td>' +
              '</tr>' +
            '</tbody>' +
          '</table>' +
        '</div>' +
      '</div>');

    versions = processing.shakemap_versions;
    buf.push(
      '<div class="one-of-two column">' +
        '<h3>ShakeMap Versions</h3>' +
        '<div class="horizontal-scrolling">' +
          '<table>' +
            '<tbody>' +
              '<tr>' +
                '<th scope="row">Code</th>' +
                '<td>' + versions.shakemap_revision + '</td>' +
              '</tr>' +
              '<tr>' +
                '<th scope="row">Map</th>' +
                '<td>' + versions.map_version + '</td>' +
              '</tr>' +
              '<tr>' +
                '<th scope="row">Date</th>' +
                '<td>' + versions.process_time + '</td>' +
              '</tr>' +
            '</tbody>' +
          '</table>' +
        '</div>' +
      '</div>');

    response = processing.site_response;
    buf.push(
      '<div class="one-of-two column">' +
        '<h3>Site Response</h3>' +
        '<div class="horizontal-scrolling">' +
          '<table>' +
            '<tbody>' +
              '<tr>' +
                '<th scope="row">Reference rock Vs30</th>' +
                '<td>' + response.vs30default + ' (m/s)</td>' +
              '</tr>' +
              '<tr>' +
                '<th scope="row">Site correction applied</th>' +
                '<td>' + response.site_correction + '</td>' +
              '</tr>' +
            '</tbody>' +
          '</table>' +
        '</div>' +
      '</div>');

    buf.push(
      '<div class="one-of-two column">' +
        _this.formatProcessingRois(processing.roi) +
      '</div>');

    buf.push('</div>');
    el.innerHTML = buf.join('');
  };


  _initialize(options);
  options = null;
  return _this;
};


module.exports = ShakeMapInfoView;
