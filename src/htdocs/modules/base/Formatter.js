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
 * Format a latitude
 * @param latitude {Number}
 *        the latitude.
 * @return {String} formatted string.
 */
Formatter.prototype.formatLatitude = function (latitude) {
  var latDir,
      decimals;

  latDir = (latitude > 0 ? 'N' : 'S');
  decimals = this._options.locationDecimals;

  // already have sign information, abs before rounding
  latitude = Math.abs(latitude);

  // round to configured number of decimals
  if (typeof decimals === 'number') {
    latitude = latitude.toFixed(decimals);
  }

  return [
    latitude, '&nbsp;&deg;', latDir
  ].join('');
};

/**
 * Format a longitude
 * @param longitude {Number}
 *        the longitude.
 * @return {String} formatted string.
 */
Formatter.prototype.formatLongitude = function (longitude) {
  var lonDir,
      decimals;

  lonDir = (longitude > 0 ? 'E' : 'W');
  decimals = this._options.locationDecimals;

  // already have sign information, abs before rounding
  longitude = Math.abs(longitude);

  // round to configured number of decimals
  if (typeof decimals === 'number') {
    longitude = longitude.toFixed(decimals);
  }

  return [
    longitude, '&nbsp;&deg;', lonDir
  ].join('');
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
  return [
      this.formatLatitude(latitude),
      '&nbsp',
      this.formatLongitude(longitude)
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

/**
 * Format a date and time.
 *
 * @param stamp {Date|Number}
 *        Date or millisecond epoch timstamp to format.
 * @param minutesOffset {Number}
 *        UTC offset in minutes.  0 for UTC.
 * @param includeMilliseconds {Boolean}
 *        default false.
 *        whether to output milliseconds.
 * @return {String}
 *         formatted date.
 */
Formatter.prototype.datetime = function (stamp, minutesOffset,
    includeMilliseconds) {
  var milliOffset,
      date;

  if (!stamp && stamp !== 0) {
    return this._options.empty;
  }

  milliOffset = minutesOffset * 60 * 1000;
  date = new Date(stamp + milliOffset);

  return this.date(date) + ' ' + this.time(date, includeMilliseconds) +
      ' (UTC' + this.timezoneOffset(minutesOffset) + ')';
};

/**
 * Format a UTC date.
 *
 * @param date {Date}
 *        date to format.
 * @return {String}
 *         formatted date.
 */
Formatter.prototype.date = function (date) {
  var year,
      month,
      day;

  year = date.getUTCFullYear();
  month = date.getUTCMonth() + 1;
  day = date.getUTCDate();

  if (month < 10) {
    month = '0' + month;
  }
  if (day < 10) {
    day = '0' + day;
  }

  return year + '-' + month + '-' + day;
};


/**
 * Format a UTC time.
 *
 * @param date {Date}
 *        date to format.
 * @param includeMilliseconds {Boolean}
 *        default false.
 *        whether to output milliseconds.
 * @return {String}
 *         formatted time.
 */
Formatter.prototype.time = function (date, includeMilliseconds) {
  var hours,
      minutes,
      seconds,
      milliseconds;

  hours = date.getUTCHours();
  minutes = date.getUTCMinutes();
  seconds = date.getUTCSeconds();
  milliseconds = '';

  if (hours < 10) {
    hours = '0' + hours;
  }
  if (minutes < 10) {
    minutes = '0' + minutes;
  }
  if (seconds < 10) {
    seconds = '0' + seconds;
  }
  if (includeMilliseconds) {
    milliseconds = date.getUTCMilliseconds();
    if (milliseconds < 10) {
      milliseconds = '.00' + milliseconds;
    } else if (milliseconds < 100) {
      milliseconds = '.0' + milliseconds;
    } else {
      milliseconds = '.' + milliseconds;
    }
  }

  return hours + ':' + minutes + ':' + seconds + milliseconds;
};

/**
 * Format a UTC timezone offset.
 *
 * @param offset {Number}
 *        UTC offset in minutes.  0 for UTC.
 * @return {String}
 *         formatted timezone offset, or '' when offset is 0.
 */
Formatter.prototype.timezoneOffset = function (offset) {
  var hours,
      minutes,
      sign;

  if (offset === 0 ) {
    return '';
  } else if (offset < 0) {
    sign = '-';
    offset *= -1;
  } else {
    sign = '+';
  }

  hours = parseInt(offset / 60, 10);
  minutes = parseInt(offset % 60, 10);

  if (hours < 10) {
    hours = '0' + hours;
  }
  if (minutes < 10) {
    minutes = '0' + minutes;
  }

  return sign + hours + ':' + minutes;
};

/**
 * Convert kilometers to miles.
 *
 * @param km {Number}
 *        kilometers.
 * @return {Number}
 *         miles.
 */
Formatter.prototype.kmToMi = function (km) {
  return (km * 0.621371);
};

/**
 * Formats DYFI location
 *
 * @param {response}
 *        dyfi response
 *
 * @return {string}
 *         formatted DYFI location
 */
Formatter.prototype.formatDYFILocation = function (response) {
  var country,
      location,
      region,
      zip;

  country = response.country;
  location = response.name;
  region = response.state;
  zip = response.zip;

  return location + ', ' + region + '&nbsp;' + zip + '<br />' + country;
};

module.exports = Formatter;
