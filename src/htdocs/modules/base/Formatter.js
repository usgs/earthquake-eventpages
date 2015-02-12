'use strict';

var Util = require('util/Util');


// default options
var DEFAULTS = {
  // size abbreviations for [bytes, kilobytes, megabytes, gigabytes]
  fileSizes: [' B', ' KB', ' MB', ' GB'],
  // decimal places for depth
  depthDecimals: 1,
  // decimal places for latitude/longitude
  locationDecimals: 3,
  // decimal places for magnitude
  magnitudeDecimals: 1,
  // content when a value is missing
  empty: '?'
};

/**
 * Construct a new Formatter.
 *
 * @param options {Object}
 *        formatter options.
 */
var Formatter = function (options) {
  this._options = Util.extend({}, DEFAULTS, options);
};

/**
 * Format a number.
 *
 * @param value {Number}
 *        number to format.
 * @param decimals {Number}
 *        Optional, default does not round.
 *        number of decimal places to round.
 * @param empty {Any}
 *        Optional, default none.
 *        value to return if value is empty.
 * @param units {String}
 *        Optional, default none.
 *        units of value.
 * @return {String} formatted string.
 */
Formatter.prototype.number = function (value, decimals, empty, units) {
  if (!value && value !== 0) {
    return empty;
  }
  if (typeof decimals === 'number') {
    value = Number(value).toFixed(decimals);
  }
  if (units) {
    value += ' ' + units;
  }
  return value;
};

/**
 * Format an uncertainty.
 *
 * @param error {Number}
 *        uncertainty to format.
 * @param decimals {Number}
 *        Optional, default does not round.
 *        number of decimal places to round.
 * @param empty {Any}
 *        Optional, default none.
 *        value to return if error is empty.
 * @param units {String}
 *        Optional, default none.
 *        units of error.
 * @return {String} formatted string.
 */
Formatter.prototype.uncertainty = function (error, decimals, empty, units) {
  if (!error && error !== 0) {
    return empty;
  }
  error = this.number(error, decimals, null, units);
  return '<span class="uncertainty">&plusmn; ' + error + '</span>';
};

/**
 * Format a magnitude.
 *
 * @param magnitude {Number}
 *        magnitude to format.
 * @param type {String}
 *        Optional.
 *        magnitude type.
 * @param error {Number}
 *        Optional.
 *        magnitude error.
 * @return {String} formatted string.
 */
Formatter.prototype.magnitude = function (magnitude, type, error) {
  var decimals = this._options.magnitudeDecimals,
      empty = this._options.empty;

  return this.number(magnitude, decimals, empty, type) +
      this.uncertainty(error, decimals, '');
};

/**
 * Format a depth.
 *
 * @param depth {Number}
 *        depth to format
 * @param units {String}
 *        Optional.
 *        depth units, if any.
 * @param error {Number}
 *        Optional.
 *        depth error, if any.
 * @return {String} formatted string.
 */
Formatter.prototype.depth = function (depth, units, error) {
  var decimals = this._options.depthDecimals,
      empty = this._options.empty;

  return this.number(depth, decimals, empty, units) +
      this.uncertainty(error, decimals, '');
};

/**
 * Format a latitude and longitude.
 *
 * @param latitude {Number}
 *        the latitude.
 * @param longitude {Number}
 *        the longitude.
 * @return {String} formatted string.
 */
Formatter.prototype.location = function (latitude, longitude) {
  var latDir = (latitude > 0 ? 'N' : 'S'),
      lonDir = (longitude > 0 ? 'E' : 'W'),
      decimals = this._options.locationDecimals;
  // already have sign information, abs before rounding
  latitude = Math.abs(latitude);
  longitude = Math.abs(longitude);
  // round to configured number of decimals
  if (typeof decimals === 'number') {
    latitude = latitude.toFixed(decimals);
    longitude = longitude.toFixed(decimals);
  }
  return [
      latitude, '&deg;', latDir,
      ' ',
      longitude, '&deg;', lonDir
  ].join('');
};

/**
 * Format file size using human friendly sizes.
 *
 * @param bytes {Number}
 *        bytes to format.
 * @return {String} formatted string.
 */
Formatter.prototype.fileSize = function (bytes) {
  var sizeIndex = 0,
      sizes = this._options.fileSizes;

  bytes = +bytes;
  while (bytes >= 1024) {
    bytes = bytes / 1024;
    sizeIndex++;
  }
  if (sizeIndex > 0) {
    bytes = bytes.toFixed(1);
  } else {
    bytes = bytes.toFixed(0);
  }
  return bytes + sizes[sizeIndex];
};


module.exports = Formatter;
