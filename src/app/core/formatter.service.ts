import { Injectable } from '@angular/core';

/**
 * Service for formatting various types of data such as lat/longs, angles,
 * dates, et. al
 */
@Injectable()
export class FormatterService {
  readonly depthDecimals: number;
  readonly distanceDecimals: number;
  readonly empty: string;
  readonly locationDecimals: number;
  readonly mmiArray: Array<string>;
  readonly mmiColors: Array<string>;

  constructor() {
    this.depthDecimals = 1;
    this.distanceDecimals = 1;
    this.empty = '-';
    this.locationDecimals = 3;

    this.mmiColors = [
      '#FFFFFF', // I
      '#FFFFFF', // I
      '#ACD8E9', // II
      '#ACD8E9', // III
      '#83D0DA', // IV
      '#7BC87F', // V
      '#F9F518', // VI
      '#FAC611', // VII
      '#FA8A11', // VIII
      '#F7100C', // IX
      '#C80F0A', // X
      '#C80F0A', // XI
      '#C80F0A' // XII
    ];
  }

  /**
   * Format an angle to add the degrees symbol to it
   *
   * @param angle
   *     The angle to format
   * @param decimals
   *     The number of decimal places
   * @returns
   *     The formatted angle
   */
  angle(angle: any, decimals: number): string {
    if (angle || angle === 0) {
      // Note: Append &deg; manually to avoid space between value/units
      return this.number(angle, decimals) + '°';
    } else {
      return this.empty;
    }
  }

  /**
   * Format a UTC date
   *
   * @param date
   *     Date to format
   * @returns date formatted to year-month-day
   */
  date(date: Date): string {
    let year, month, day;

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
   * Format a date and time
   *
   * @param date {Number|String|Date}
   *     Date, ISO8601 formatted string, or millisecond epoch timestamp
   * @param minutesOffset {Number} Optional, default 0
   *     UTC offset in minutes. 0 for UTC
   * @param includeMilliseconds {Boolean} Optional, default false
   *     Whether to output milliseconds
   * @returns
   *     Formattted date/time
   */
  dateTime(date, minutesOffset = 0, includeMilliseconds = false): string {
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

    return (
      this.date(date) +
      ' ' +
      this.time(date, includeMilliseconds) +
      ' (UTC' +
      this.timezoneOffset(minutesOffset) +
      ')'
    );
  }

  /**
   * Format a depth
   *
   * @param depth
   *     Depth to format
   * @param units Optional, default none
   *     Depth units, if any
   * @param error Optional, default none
   *     Depth error, if any
   * @return
   *     Depth formatted with uncertainty appended to it
   */
  depth(depth: number, units?: string, error?: number): string {
    let number, uncertainty;

    number = this.number(depth, this.depthDecimals, this.empty, units);
    uncertainty = this.uncertainty(error, this.depthDecimals, '');
    return number + uncertainty;
  }

  /**
   * Format a distance (like km or mi)
   *
   * @param distance
   *     The distance for format.
   * @param units
   *     The units for this distance
   * @returns
   *     A distance with units appended to it
   */
  distance(distance: number, units: string): string {
    return this.number(distance, this.distanceDecimals, this.empty, units);
  }

  /**
   * Format a latitude
   *
   * @param latitude
   *     The latitude
   * @param decimals {number}
   *     The number of decimals to include in the formatted output
   * @returns
   *     Latitude with degrees symbol appended
   */
  latitude(latitude: number, decimals = this.locationDecimals): string {
    let latDir, result;

    if (latitude === null || typeof latitude === 'undefined') {
      return this.empty;
    }

    latDir = latitude >= 0 ? 'N' : 'S';

    // already have sign information, abs and round
    result = this.number(Math.abs(latitude), decimals);

    return `${result}°${latDir}`;
  }

  /**
   * Left pads the source string with the pad string until the source string
   * is at least `length` in length. If the source length is already greater
   * than or equal to the desired length, the original source is returned
   *
   * @param source
   *     The string to pad
   * @param length
   *     The desired length
   * @param pad
   *     The padding to add to the beginning of the source string until the
   *     desired length is met. Should be a single rendered character
   * @returns
   *     A string padded out to the desired length with the given pad
   */
  leftPad(source: string, length: number, pad: string): string {
    let i, padLength, padding;

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
   * Format a latitude and longitude
   *
   * @param latitude {Number}
   *     The latitude
   * @param longitude {Number}
   *     The longitude
   * @param decimals {Number} Optional, default this.locationDecimals
   *     The number of decimals to include in the formatted output
   * @returns
   *     Coordinates based on lat/long
   */
  location(
    latitude: number,
    longitude: number,
    decimals = this.locationDecimals
  ): string {
    return (
      this.latitude(latitude, decimals) +
      ' ' +
      this.longitude(longitude, decimals)
    );
  }

  /**
   * Format a longitude
   *
   * @param longitude
   *     The longitude
   * @param decimals
   *     The number of decimals to include in the formatted output
   * @returns
   *    formatted longitude
   */
  longitude(longitude: number, decimals = this.locationDecimals): string {
    let lngDir, result;

    if (longitude === null || typeof longitude === 'undefined') {
      return this.empty;
    }

    lngDir = longitude >= 0 ? 'E' : 'W';

    // already have sign information, abs and round
    result = this.number(Math.abs(longitude), decimals);

    return `${result}°${lngDir}`;
  }

  /**
   * Format a magnitude and magnitude type
   *
   * @param value
   *        Magnitude value to format
   * @param type
   *        Magnitude type to format with magnitude value (i.e. mw, mww, mb)
   * @returns
   *     Formatted magnitude
   */
  magnitude(value: number, type: string): any {
    if (!value && value !== 0) {
      return this.empty;
    }

    return this.number(value, null, null, type);
  }

  /**
   * Associate a cdi with it's proper color
   *
   * @param cdi
   *      The magnitude
   * @returns
   *      The color in the array
   */
  mmiColor(cdi: number): string {
    if (cdi === null || !cdi) {
      return null;
    }
    cdi = Math.round(cdi);
    return this.mmiColors[cdi] || null;
  }

  /**
   * Format a number
   *
   * @param value
   *     Number to format
   * @param decimals Optional, default does not round
   *     Number of decimal places to round
   * @param empty {Any} Optional, default none
   *     Value to return if value is empty.
   * @param units {String} Optional, default none
   *     Units of value
   * @returns
   *     Number appended with units
   */
  number(
    value: number | any,
    decimals?: number,
    empty = this.empty,
    units = ''
  ): string {
    let factor, result;

    // The point of this is some of the old property values for groundMotion
    // in shakemap offshore events may come in as '--' instead of null,
    // and they need to be rendered as the empty character which is '-'
    if (value !== null && typeof value === 'string') {
      if (value === '--' || value === '-') {
        return empty;
      }
    }

    if (!value && value !== 0) {
      return empty;
    }

    if (typeof decimals === 'number') {
      factor = Math.pow(10, decimals);
      result = (Math.round(factor * value) / factor).toFixed(decimals);
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
   * @param status
   *        Review status to format. ("reviewed", "official")
   * @returns
   *     The status to uppercase
   */
  reviewStatus(status: string): string {
    if (!status) {
      return this.empty;
    }

    return status.toUpperCase();
  }

  /**
   * Format a UTC time
   *
   * @param date
   *     Date to format
   * @param includeMilliseconds {Boolean} Optional, default false
   *     Whether to output milliseconds
   * @returns
   *     Date formatted to UTC time in hours:minutes:seconds:milliseconds
   */
  time(date: Date, includeMilliseconds = false): string {
    let hours, minutes, seconds, milliseconds;

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
   * Format a UTC timezone offset
   *
   * @param offset {Number} Optional, default 0
   *     UTC offset in minutes. 0 for UTC
   * @returns
   *     Time zone offset in sign:hours:minutes with sign being +/-
   */
  timezoneOffset(offset = 0): string {
    let hours, minutes, sign;

    if (!offset || offset === 0) {
      return '';
    } else if (offset < 0) {
      sign = '-';
      offset *= -1;
    } else {
      sign = '+';
    }

    hours = parseInt('' + offset / 60, 10);
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
   * Format an uncertainty
   *
   * @param error
   *     Uncertainty to format
   * @param decimals Optional, default does not round
   *     Number of decimal places to round
   * @param empty {Any}
   *     Value to return if error is empty
   * @param units Optional, default none
   *     Units of error
   * @returns
   *     Uncertainty prepended with the +/- symbol
   */
  uncertainty(
    error: number,
    decimals: number,
    empty = this.empty,
    units?: string
  ): string {
    let result;

    if (!error && error !== 0) {
      return empty;
    }

    result = this.number(error, decimals, null, units);
    return `&plusmn; ${result}`;
  }
}
