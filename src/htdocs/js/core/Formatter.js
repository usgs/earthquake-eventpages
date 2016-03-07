'use strict';

var Util = require('util/Util');


// default options
var _DEFAULTS = {
  // decimal places for depth
  depthDecimals: 1,
  // content when a value is missing
  empty: '&ndash;',
  // size abbreviations for [bytes, kilobytes, megabytes, gigabytes]
  fileSizes: [' B', ' KB', ' MB', ' GB'],
  // decimal places for latitude/longitude
  locationDecimals: 3,
  // decimal places for magnitude
  magnitudeDecimals: 1
};


var _MILES_PER_KILOMETER = 0.621371;


/**
 * Construct a new Formatter.
 *
 * @param options {Object}
 *        formatter options.
 */
var Formatter = function (options) {
  var _this,
      _initialize,

      _depthDecimals,
      _empty,
      _fileSizes,
      _locationDecimals,
      _magnitudeDecimals;

  _this = {};

  _initialize = function (options) {
    options = Util.extend({}, _DEFAULTS, options);

    _depthDecimals = options.depthDecimals;
    _empty = options.empty;
    _fileSizes = options.fileSizes;
    _locationDecimals = options.locationDecimals;
    _magnitudeDecimals = options.magnitudeDecimals;
  };


  _this.angle = function (angle, decimals) {
    var value;

    if (!angle && angle !== 0) {
      return _empty;
    }

    if (typeof decimals === 'number') {
      value = Number(angle).toFixed(decimals);
    } else {
      value = Math.round(angle);
    }

    return value + '&deg;';
  };

  /**
   * Format a UTC date.
   *
   * @param date {Date}
   *        date to format.
   * @return {String}
   *         formatted date.
   */
  _this.date = function (date) {
    var year,
        month,
        day;

    if (!date || typeof date.getTime !== 'function') {
      return _empty;
    }

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
  _this.datetime = function (stamp, minutesOffset, includeMilliseconds) {
    var milliOffset,
        date;

    if (!stamp && stamp !== 0) {
      return _empty;
    } else if (typeof stamp.getTime === 'function') {
      // allow Date objects
      stamp = stamp.getTime();
    }

    minutesOffset = minutesOffset || 0;
    milliOffset = minutesOffset * 60 * 1000;
    date = new Date(stamp + milliOffset);

    return _this.date(date) + ' ' + _this.time(date, includeMilliseconds) +
        ' (UTC' + _this.timezoneOffset(minutesOffset) + ')';
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
  _this.depth = function (depth, units, error) {
    if (!depth && depth !== 0) {
      return _empty;
    }
    return _this.number(depth, _depthDecimals, _empty, units) +
        _this.uncertainty(error, _depthDecimals, '');
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
  _this.dyfiLocation = function (response) {
    var country,
        location,
        region,
        zip;

    country = response.country;
    location = response.name;
    region = response.state;
    zip = response.zip;

    return '<span class="dyfi-response-location">' + location + ', ' +
        region + '&nbsp;' + zip + '<br /><small>' + country + '</small></span>';
  };

  /**
   * Format file size using human friendly sizes.
   *
   * @param bytes {Number}
   *        bytes to format.
   * @return {String} formatted string.
   */
  _this.fileSize = function (bytes) {
    var sizeIndex;

    if (!bytes && bytes !== 0) {
      return _empty;
    }

    sizeIndex = 0;
    bytes = Number(bytes);
    while (bytes >= 1024) {
      bytes = bytes / 1024;
      sizeIndex++;
    }
    if (sizeIndex > 0) {
      bytes = bytes.toFixed(1);
    } else {
      bytes = bytes.toFixed(0);
    }
    return bytes + _fileSizes[sizeIndex];
  };

  /**
   * Convert kilometers to miles.
   *
   * @param km {Number}
   *        kilometers.
   * @return {Number}
   *         miles.
   */
  _this.kmToMi = function (km) {
    if (!km) {
      return km;
    }
    return (km * _MILES_PER_KILOMETER);
  };

  /**
   * Format a latitude
   * @param latitude {Number}
   *        the latitude.
   * @return {String} formatted string.
   */
  _this.latitude = function (latitude) {
    var latDir;

    if (!latitude && latitude !== 0) {
      return _empty;
    }
    latDir = (latitude > 0 ? 'N' : 'S');

    // already have sign information, abs before rounding
    latitude = Math.abs(latitude);

    // round to configured number of decimals
    if (typeof _locationDecimals === 'number') {
      latitude = latitude.toFixed(_locationDecimals);
    }

    return latitude + '&deg;' + latDir;
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
  _this.location = function (latitude, longitude) {
    return _this.latitude(latitude) + '&nbsp;' +
        _this.longitude(longitude);
  };

  /**
   * Format a longitude
   * @param longitude {Number}
   *        the longitude.
   * @return {String} formatted string.
   */
  _this.longitude = function (longitude) {
    var lonDir;

    if (!longitude && longitude !== 0) {
      return _empty;
    }
    lonDir = (longitude > 0 ? 'E' : 'W');

    // already have sign information, abs before rounding
    longitude = Math.abs(longitude);

    // round to configured number of decimals
    if (typeof _locationDecimals === 'number') {
      longitude = longitude.toFixed(_locationDecimals);
    }

    return longitude + '&deg;' + lonDir;
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
  _this.magnitude = function (magnitude, type, error) {
    return _this.number(magnitude, _magnitudeDecimals, _empty, type) +
        _this.uncertainty(error, _magnitudeDecimals, '');
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
  _this.number = function (value, decimals, empty, units) {
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
  _this.time = function (date, includeMilliseconds) {
    var hours,
        minutes,
        seconds,
        milliseconds;

    if (!date || typeof date.getTime !== 'function') {
      return _empty;
    }

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
  _this.timezoneOffset = function (offset) {
    var hours,
        minutes,
        sign;

    if (!offset || offset === 0) {
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
  _this.uncertainty = function (error, decimals, empty, units) {
    if (!error && error !== 0) {
      return empty;
    }
    error = _this.number(error, decimals, null, units);
    return '<span class="uncertainty">&plusmn; ' + error + '</span>';
  };


  _initialize(options);
  options = null;
  return _this;
};


Formatter.MILES_PER_KILOMETER = _MILES_PER_KILOMETER;


module.exports = Formatter;
