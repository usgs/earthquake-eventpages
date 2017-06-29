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

  describe('backAzimuth', function () {
    it('returns correct backAzimuth 180 degrees returns 0 degrees',
        function () {
      expect(formatter.backAzimuth(180)).to.equal(0);
    });

    it('returns correct backAzimuth 0 degrees returns 180 degrees',
        function () {
      expect(formatter.backAzimuth(0)).to.equal(180);
    });

    it('returns correct backAzimuth 90 degrees returns 270 degrees',
        function () {
      expect(formatter.backAzimuth(90)).to.equal(270);
    });

    it('returns correct backAzimuth 270 degrees returns 90 degrees',
        function () {
      expect(formatter.backAzimuth(270)).to.equal(90);
    });
  });

  describe('compassWinds', function () {
    it('0 degrees returns N', function () {
      expect(formatter.compassWinds(0)).to.equal('N');
    });

    it('22.5 degrees returns NNE', function () {
      expect(formatter.compassWinds(22.5)).to.equal('NNE');
    });

    it('45 degrees returns NE', function () {
      expect(formatter.compassWinds(45)).to.equal('NE');
    });

    it('67.5 degrees returns ENE', function () {
      expect(formatter.compassWinds(67.5)).to.equal('ENE');
    });

    it('90 degrees returns E', function () {
      expect(formatter.compassWinds(90)).to.equal('E');
    });

    it('112.5 Degrees returns ESE', function () {
      expect(formatter.compassWinds(112.5)).to.equal('ESE');
    });

    it('135 degrees returns SE', function () {
      expect(formatter.compassWinds(135)).to.equal('SE');
    });

    it('157.5 degrees returns SSE', function () {
      expect(formatter.compassWinds(157.5)).to.equal('SSE');
    });

    it('180 degrees returns S', function () {
      expect(formatter.compassWinds(180)).to.equal('S');
    });

    it('202.5 degrees returns SSW', function () {
      expect(formatter.compassWinds(202.5)).to.equal('SSW');
    });

    it('225 degrees returns SW', function () {
      expect(formatter.compassWinds(225)).to.equal('SW');
    });

    it('247.5 degrees returns WSW', function () {
      expect(formatter.compassWinds(247.5)).to.equal('WSW');
    });

    it('270 degrees returns W', function () {
      expect(formatter.compassWinds(270)).to.equal('W');
    });

    it('292.5 degrees returns WNW', function () {
      expect(formatter.compassWinds(292.5)).to.equal('WNW');
    });

    it('315 degrees returns NW', function () {
      expect(formatter.compassWinds(315)).to.equal('NW');
    });

    it('337.5 degrees returns NNW', function () {
      expect(formatter.compassWinds(337.5)).to.equal('NNW');
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

  describe('intensity', function () {
    it('formats the intensity', function () {
      var abbr = '</span>' +
          '<abbr title="Modified Mercalli Intensity">mmi</abbr>';
      expect(formatter.intensity(1.4)).to.equal(
        '<span class="mmi mmiI"><span class="roman"><strong>I</strong>' +
        '</span></span>');
      expect(formatter.intensity(1.4, abbr)).to.equal(
        '<span class="mmi mmiI"><span class="roman"><strong>I</strong>' +
        '</span>' + abbr + '</span>');
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

  describe('leftPad', function () {
    it('does not pad longer strings', function () {
      expect(formatter.leftPad('longer string', 2, 'X')).to.equal(
          'longer string');
    });

    it('pads out a shorter string', function () {
      expect(formatter.leftPad('short', '10', '-')).to.equal(
          '-----short');
    });
  });

  describe('location', function () {
    it('formats as expected', function () {
      expect(formatter.location(1.23, 2.34)).to.equal(
      formatter.latitude(1.23) + '&nbsp;' +
      formatter.longitude(2.34));
    });
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

  describe('mmi', function () {
    it('returns a roman Numeral', function () {
      expect(formatter.mmi(1.4, '-')).to.equal('I');
    });
    it('returns the empty value', function () {
      expect(formatter.mmi(-1,'n')).to.equal('n');
    });
  });

  describe('mmiColor', function () {
    it('returns the correct mmi color', function () {
      expect(formatter.mmiColor(1.4)).to.equal('#FFFFFF');
    });
  });

  describe('normalizeLongitude', function () {
    it('returns null value when is null or NaN', function () {
      expect(formatter.normalizeLongitude(null)).to.equal(null);
      expect(formatter.normalizeLongitude('test')).to.equal(null);
    });

    it('returns normalized value', function () {
      expect(formatter.normalizeLongitude(0)).to.equal(0);
      expect(formatter.normalizeLongitude(180)).to.equal(180);
      expect(formatter.normalizeLongitude(-180)).to.equal(-180);

      expect(formatter.normalizeLongitude(-260)).to.equal(100);
      expect(formatter.normalizeLongitude(-620)).to.equal(100);

      expect(formatter.normalizeLongitude(260)).to.equal(-100);
      expect(formatter.normalizeLongitude(620)).to.equal(-100);
    });
  });

  describe('number', function () {
    it('returns empty value when undefined', function () {
      expect(formatter.number(null, 1, 'empty')).to.equal('empty');
    });

    it('returns EMPTY value when undefined and empty value is not passed',
        function () {
      expect(formatter.number(null, 1)).to.equal('EMPTY');
    });

    it('uses decimals to round', function () {
      expect(formatter.number(1.2366, 3)).to.equal('1.237');
    });

    it('supports units', function () {
      expect(formatter.number(1, 0, 'empty', 'units')).to.equal('1 units');
    });
  });

  describe('numberWithCommas', function () {
    it('returns passed empty value when x is null', function () {
      expect(formatter.numberWithCommas(null, 'emptyValue')).
          to.equal('emptyValue');
    });

    it('returns EMPTY when x is null and empty value is not passed',
        function () {
      expect(formatter.numberWithCommas(null)).to.equal('EMPTY');
    });

    it('returns number correctly formatted', function () {
      expect(formatter.numberWithCommas(30000)).to.equal('30,000');
    });

    it('returns EMPTY when no x value is passed', function () {
      expect(formatter.numberWithCommas()).to.equal('EMPTY');
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
