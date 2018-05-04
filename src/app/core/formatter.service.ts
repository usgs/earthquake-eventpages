import { Injectable } from '@angular/core';

@Injectable()
export class FormatterService {
  public readonly depthDecimals: number;
  public readonly distanceDecimals: number;
  public readonly empty: string;
  public readonly locationDecimals: number;
  public readonly mmiArray: Array<string>;
  public readonly mmiColors: Array<string>;

  constructor () {
    this.depthDecimals = 1;
    this.distanceDecimals = 1;
    this.empty = '-';
    this.locationDecimals = 3;
    this.mmiArray = ['I', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII',
        'IX', 'X', 'XI', 'XII'];
  }

  /**
   * @param angle {Number}
   * @param decimals {Number}
   *
   * @return {String}
   */
  angle (angle: any, decimals: number): string {
      if (angle || angle === 0) {
        // Note: Append &deg; manually to avoid space between value/units
        return this.number(angle, decimals) + '°';
      } else {
        return this.empty;
      }
  }

  /**
   * Format a UTC date.
   *
   * @param date {Date}
   *     Date to format.
   *
   * @return {String}
   */
  date (date: Date): string {
    let year,
        month,
        day;

    if (!date || typeof date.getTime !== 'function') {
      return this.empty;
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

    return `${year}-${month}-${day}`;
  }

  /**
   * Format a date and time.
   *
   * @param date {Number|String|Date}
   *     Date, ISO8601 formatted string, or millisecond epoch timstamp.
   * @param minutesOffset {Number} Optional, default 0
   *     UTC offset in minutes. 0 for UTC.
   * @param includeMilliseconds {Boolean} Optional, default false
   *     Whether to output milliseconds.
   *
   * @return {String}
   */
  dateTime (date: any, minutesOffset = 0, includeMilliseconds = false) {
    let milliOffset;

    if (date === null || typeof date === 'undefined') {
      return this.empty;
    }

    if (!(date instanceof Date)) {
      date = new Date(date);
    }

    if (minutesOffset) {
      milliOffset = minutesOffset * 60 * 1000;
      date = new Date(date.getTime() + milliOffset);
    }

    return this.date(date) + ' ' + this.time(date, includeMilliseconds) +
        ' (UTC' + this.timezoneOffset(minutesOffset) + ')';
  }

  /**
   * Format a depth.
   *
   * @param depth {Number}
   *     Depth to format
   * @param units {String} Optional, default none
   *     Depth units, if any.
   * @param error {Number} Optional, default none
   *     Depth error, if any.
   *
   * @return {String}
   */
  depth (depth: number, units?: string, error?: number) {
    let number,
        uncertainty;

    number = this.number(depth, this.depthDecimals, this.empty, units);
    uncertainty = this.uncertainty(error, this.depthDecimals, '');
    return number + uncertainty;
  }

  /**
   * Format a distance (like km or mi).
   *
   * @param distance {Number}
   *     The distance for format.
   * @param units {String}
   *     The units for this distance.
   *
   * @return {String}
   *     A formatted distance string.
   */
  distance (distance: number, units: string): string {
    return this.number(distance, this.distanceDecimals, this.empty, units);
  }

  /**
   * Format a measured intensity as a roman numeral
   *
   * @param mmi {Number}
   *     The intensity
   *
   * @return {String}
   *     An MMI roman numeral
   */
  intensity (mmi: number): string {
    mmi = Math.round(mmi);

    return this.mmiArray[mmi];
  }

  /**
   * Format a latitude
   *
   * @param latitude {Number}
   *     The latitude.
   * @param decimals Optional, default this.locationDecimals
   *     The number of decimals to include in the formatted output.
   *
   * @return {String}
   */
  latitude (latitude: number, decimals = this.locationDecimals): string {
    let latDir,
        result;

    if (latitude === null || typeof latitude === 'undefined') {
      return this.empty;
    }

    latDir = (latitude >= 0 ? 'N' : 'S');

    // already have sign information, abs and round
    result = this.number(Math.abs(latitude), decimals);

    return `${result}°${latDir}`;
  }

  /**
   * Left pads the source string with the pad string until the source string
   * is at least `length` in length. If the source length is already greater
   * than or equal to the desired length, the original source is returned.
   *
   * @param source {String}
   *     The string to pad
   * @param length {Integer}
   *     The desired length
   * @param pad {String} Optional. Default ' ' (single space)
   *     The padding to add to the beginning of the source string until the
   *     desired length is met. Should be a single rendered character.
   *
   * @return {String}
   *     A string padded out to the desired length with the given pad.
   */
  leftPad (source: string, length: number, pad: string) {
    let i,
        padLength,
        padding;

    padLength = length - source.length;
    padding = [];

    if (padLength < 1) {
      return source;
    }

    for (i = 0; i < padLength; i++) {
      padding[i] = pad;
    }


    return padding.join('') + source;
  }

  /**
   * Format a latitude and longitude.
   *
   * @param latitude {Number}
   *     The latitude.
   * @param longitude {Number}
   *     The longitude.
   * @param decimals {Number} Optional, default this.locationDecimals
   *     The number of decimals to include in the formatted output.
   *
   * @return {String}
   */
  location (latitude: number, longitude: number,
      decimals = this.locationDecimals): string {
    return this.latitude(latitude, decimals) + ' ' +
        this.longitude(longitude, decimals);
  }

  /**
   * Format a longitude
   *
   * @param longitude {Number}
   *     The longitude.
   * @param decimals Optional, default this.locationDecimals
   *     The number of decimals to include in the formatted output.
   *
   * @return {String}
   */
  longitude (longitude: number, decimals = this.locationDecimals): string {
    let lngDir,
        result;

    if (longitude === null || typeof longitude === 'undefined') {
      return this.empty;
    }

    lngDir = (longitude >= 0 ? 'E' : 'W');

    // already have sign information, abs and round
    result = this.number(Math.abs(longitude), this.locationDecimals);


    return `${result}°${lngDir}`;
  }

  /**
   * Format a magnitude and magnitude type.
   *
   * @param value {Number}
   *        Magnitude value to format.
   * @param type {String}
   *        Magnitude type to format with magnitude value (i.e. mw, mww, mb)
   *
   * @return {String}
   */
  magnitude (value: number, type: string) {
    if (!value && value !== 0) {
      return this.empty;
    }

    return this.number(value, null, type);
  }

  /**
   * Format a number.
   *
   * @param value {Number}
   *     Number to format.
   * @param decimals {Number} Optional, default does not round.
   *     Number of decimal places to round.
   * @param empty {Any} Optional, default none.
   *     Value to return if value is empty.
   * @param units {String} Optional, default none.
   *     Units of value.
   *
   * @return {String}
   */
  number (value: number, decimals?: number, empty = this.empty,
      units = ''): string {
    let factor,
        result;

    if (!value && value !== 0) {
      return empty;
    }

    if (typeof decimals === 'number') {
      factor = Math.pow(10, decimals);
      result = (Math.round(value * factor) / factor).toFixed(decimals);
    } else {
      result = `${value}`;
    }

    if (units) {
      result += ' ' + units;
    }

    return result;
  }

  /**
   * Format the review status of a product
   *
   * @param status {String}
   *        Review status to format. ("reviewed", "official")
   *
   * @return {String}
   */
  reviewStatus (status: string): string {
    if (!status) {
      return this.empty;
    }

    return status.toUpperCase();
  }

  /**
   * Format a UTC time.
   *
   * @param date {Date}
   *     Date to format.
   * @param includeMilliseconds {Boolean} Optional, default false.
   *     Whether to output milliseconds.
   *
   * @return {String}
   */
  time (date: Date, includeMilliseconds = false): string {
    let hours,
        minutes,
        seconds,
        milliseconds;

    if (!date) {
      return this.empty;
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

    return `${hours}:${minutes}:${seconds}${milliseconds}`;
  }

  /**
   * Format a UTC timezone offset.
   *
   * @param offset {Number} Optional, default 0
   *     UTC offset in minutes. 0 for UTC.
   *
   * @return {String}
   */
  timezoneOffset (offset = 0): string {
    let hours,
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

    hours = parseInt('' + (offset / 60), 10);
    minutes = parseInt('' + (offset % 60), 10);

    if (hours < 10) {
      hours = '0' + hours;
    }
    if (minutes < 10) {
      minutes = '0' + minutes;
    }

    return `${sign}${hours}:${minutes}`;
  }

  /**
   * Format an uncertainty.
   *
   * @param error {Number}
   *     Uncertainty to format.
   * @param decimals {Number} Optional, default does not round.
   *     Number of decimal places to round.
   * @param empty {Any}
   *     Value to return if error is empty.
   * @param units {String} Optional, default none.
   *     Units of error.
   *
   * @return {String} formatted string.
   */
  uncertainty (error: number, decimals: number, empty = this.empty,
      units?: string): string {
    let result;

    if (!error && error !== 0) {
      return empty;
    }

    result = this.number(error, decimals, null, units);
    return `&plusmn; ${result}`;
  }
}
