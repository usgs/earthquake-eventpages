/* global chai, describe, it */
'use strict';

var Formatter = require('core/Formatter');

var expect = chai.expect;


describe('core/Formatter', function () {
  var formatter,
      testDate;

  formatter = Formatter({
    depthDecimals: 2,
    empty: 'EMPTY',
    locationDecimals: 4,
    magnitudeDecimals: 5
  });

  testDate = new Date('2001-01-02T01:02:03.123Z');

  describe('constructor', function () {
    it('is a function', function () {
      expect(typeof Formatter).to.equal('function');
    });
  });

  describe('angle', function () {
    it('returns empty value when undefined', function () {
      expect(formatter.angle()).to.equal('EMPTY');
    });

    it('formats zero angle', function () {
      expect(formatter.angle(0)).to.equal('0&deg;');
    });

    it('rounds when no decimals specified', function () {
      expect(formatter.angle(1.2)).to.equal('1&deg;');
    });

    it('rounds to specified number of decimals', function () {
      expect(formatter.angle(1.2, 2)).to.equal('1.20&deg;');
    });
  });

  describe('date', function () {
    it('returns empty value when undefined', function () {
      expect(formatter.date()).to.equal('EMPTY');
    });

    it('formats date as YYYY-MM-DD', function () {
      expect(formatter.date(testDate)).to.equal('2001-01-02');
    });
  });

  describe('datetime', function () {
    it('returns empty value when undefined', function () {
      expect(formatter.datetime()).to.equal('EMPTY');
    });

    it('formats datetime', function () {
      expect(formatter.datetime(testDate)).to.equal(
          '2001-01-02 01:02:03 (UTC)');
    });

    it('includes milliseconds when requested', function () {
      expect(formatter.datetime(testDate, 0, true)).to.equal(
          '2001-01-02 01:02:03.123 (UTC)');
    });

    it('supports custom timezones', function () {
      expect(formatter.datetime(testDate, 75, true)).to.equal(
          '2001-01-02 02:17:03.123 (UTC+01:15)');
    });
  });

  describe('depth', function () {
    it('returns empty value when undefined', function () {
      expect(formatter.depth()).to.equal('EMPTY');
    });

    it('formats depth', function () {
      expect(formatter.depth(1.234)).to.equal('1.23');
    });

    it('supports units', function () {
      expect(formatter.depth(1.234, 'nm')).to.equal('1.23 nm');
    });

    it('supports uncertainty', function () {
      expect(formatter.depth(1.234, 'nm', 0.12)).to.equal(
          '1.23 nm<span class="uncertainty">&plusmn; 0.12</span>');
    });
  });

  describe('dyfiLocation', function () {
    it('formats a location', function () {
      expect(formatter.dyfiLocation({
        'country': 'country',
        'name': 'location',
        'state': 'region',
        'zip': 'zip'
      })).to.equal(
          '<span class="dyfi-response-location">location, region' +
          '&nbsp;zip<br /><small>country</small></span>');
    });
  });

  describe('fileSize', function () {
    it('returns empty value when undefined', function () {
      expect(formatter.fileSize()).to.equal('EMPTY');
    });

    it('formats bytes', function () {
      expect(formatter.fileSize(123)).to.equal('123 B');
    });

    it('formats kilobytes', function () {
      expect(formatter.fileSize(2149)).to.equal('2.1 KB');
    });

    it('formats megabytes', function () {
      expect(formatter.fileSize(2249000)).to.equal('2.1 MB');
    });

    it('formats gigabytes', function () {
      expect(formatter.fileSize(2249000000)).to.equal('2.1 GB');
    });
  });

  describe('kmToMi', function () {
    expect(formatter.kmToMi(1).toFixed(3)).to.equal('0.621');
  });

  describe('latitude', function () {
    it('returns empty value when undefined', function () {
      expect(formatter.latitude()).to.equal('EMPTY');
    });

    it('formats direction', function () {
      expect(formatter.latitude(1.2)).to.equal('1.2000&deg;N');
      expect(formatter.latitude(-1.2)).to.equal('1.2000&deg;S');
    });
  });

  describe('location', function () {
    expect(formatter.location(1.23, 2.34)).to.equal(
      formatter.latitude(1.23) + '&nbsp;' +
      formatter.longitude(2.34));
  });

  describe('longitude', function () {
    it('returns empty value when undefined', function () {
      expect(formatter.longitude()).to.equal('EMPTY');
    });

    it('formats direction', function () {
      expect(formatter.longitude(1.2)).to.equal('1.2000&deg;E');
      expect(formatter.longitude(-1.2)).to.equal('1.2000&deg;W');
    });
  });

  describe('magnitude', function () {
    it('returns empty value when undefined', function () {
      expect(formatter.magnitude()).to.equal('EMPTY');
    });

    it('formats depth', function () {
      expect(formatter.magnitude(1.234)).to.equal('1.23400');
    });

    it('supports units', function () {
      expect(formatter.magnitude(1.234, 'type')).to.equal('1.23400 type');
    });

    it('supports uncertainty', function () {
      expect(formatter.magnitude(1.234, 'type', 0.12)).to.equal(
          '1.23400 type<span class="uncertainty">&plusmn; 0.12000</span>');
    });
  });

  describe('number', function () {
    it('returns empty value when undefined', function () {
      expect(formatter.number(null, 1, 'empty')).to.equal('empty');
    });

    it('uses decimals to round', function () {
      expect(formatter.number(1.2366, 3)).to.equal('1.237');
    });

    it('supports units', function () {
      expect(formatter.number(1, 0, 'empty', 'units')).to.equal('1 units');
    });
  });

  describe('time', function () {
    it('returns empty value when undefined', function () {
      expect(formatter.time()).to.equal('EMPTY');
    });

    it('formats time', function () {
      expect(formatter.time(testDate)).to.equal(
          '01:02:03');
    });

    it('includes milliseconds when requested', function () {
      expect(formatter.time(testDate, true)).to.equal(
          '01:02:03.123');
    });
  });

  describe('timezoneOffset', function () {
    it('returns empty string when undefined', function () {
      expect(formatter.timezoneOffset()).to.equal('');
    });

    it('supports positive values', function () {
      expect(formatter.timezoneOffset(123)).to.equal('+02:03');
    });

    it('supports negative values', function () {
      expect(formatter.timezoneOffset(-123)).to.equal('-02:03');
    });
  });

  describe('uncertainty', function () {
    it('returns empty value when undefined', function () {
      expect(formatter.uncertainty(null, 1, 'empty')).to.equal('empty');
    });

    it('uses decimals to round', function () {
      expect(formatter.uncertainty(1.2366, 3)).to.equal(
          '<span class="uncertainty">&plusmn; 1.237</span>');
    });

    it('supports units', function () {
      expect(formatter.uncertainty(1.2366, 3, 'empty', 'units')).to.equal(
          '<span class="uncertainty">&plusmn; 1.237 units</span>');
    });
  });

});
