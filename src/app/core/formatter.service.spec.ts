import { TestBed, getTestBed, inject } from '@angular/core/testing';

import { FormatterService } from './formatter.service';


describe('FormatterService', () => {
  let injector: TestBed,
      testDate: Date;

  beforeEach(() => {
    testDate = new Date('2001-01-02T01:02:03.123Z');

    TestBed.configureTestingModule({
      providers: [FormatterService]
    });

    injector = getTestBed();
  });

  it('should be created', inject([FormatterService],
        (service: FormatterService) => {
    expect(service).toBeTruthy();
  }));

  describe('angle', () => {
    it('returns empty value when undefined', inject(
        [FormatterService], (formatter: FormatterService) => {
      expect(formatter.angle(null, null)).toBe('-');
    }));

    it('formats zero angle', inject(
        [FormatterService], (formatter: FormatterService) => {
      expect(formatter.angle(0, null)).toBe('0°');
    }));

    it('preserves when no decimals specified', inject(
        [FormatterService], (formatter: FormatterService) => {
      expect(formatter.angle(1.2, null)).toBe('1.2°');
    }));

    it('rounds to specified number of decimals', inject(
        [FormatterService], (formatter: FormatterService) => {
      expect(formatter.angle(1.2, 0)).toBe('1°');
      expect(formatter.angle(1.2, 1)).toBe('1.2°');
      expect(formatter.angle(1.2, 2)).toBe('1.20°');
    }));
  });

  describe('date', () => {
    it('returns empty value when undefined', inject(
        [FormatterService], (formatter: FormatterService) => {
      expect(formatter.date(null)).toEqual(formatter.empty);
    }));

    it('formats date as YYYY-MM-DD', inject(
        [FormatterService], (formatter: FormatterService) => {
      expect(formatter.date(testDate)).toEqual('2001-01-02');
      expect(formatter.date(new Date(testDate.setUTCMonth(10))))
          .toEqual('2001-11-02');
      expect(formatter.date(new Date(testDate.setUTCDate(10))))
          .toEqual('2001-11-10');
    }));
  });

  describe('dateTime', () => {
    it('returns empty value when undefined', inject(
        [FormatterService], (formatter: FormatterService) => {
      expect(formatter.dateTime(null)).toEqual(formatter.empty);
    }));

    it('formats dateTime', inject(
        [FormatterService], (formatter: FormatterService) => {
      expect(formatter.dateTime(testDate)).toEqual(
          '2001-01-02 01:02:03 (UTC)');
    }));

    it('includes milliseconds when requested', inject(
        [FormatterService], (formatter: FormatterService) => {
      expect(formatter.dateTime(testDate, 0, true)).toEqual(
          '2001-01-02 01:02:03.123 (UTC)');
    }));

    it('supports custom timezones', inject(
        [FormatterService], (formatter: FormatterService) => {
      expect(formatter.dateTime(testDate, 75, true)).toEqual(
          '2001-01-02 02:17:03.123 (UTC+01:15)');
    }));
  });

  describe('depth', () => {
    it('returns empty value when undefined', inject(
        [FormatterService], (formatter: FormatterService) => {
      expect(formatter.depth(null)).toEqual(formatter.empty);
    }));

    it('formats depth', inject(
        [FormatterService], (formatter: FormatterService) => {
      expect(formatter.depth(1.234)).toEqual('1.2');
    }));

    it('supports units', inject(
        [FormatterService], (formatter: FormatterService) => {
      expect(formatter.depth(1.234, 'nm')).toEqual('1.2 nm');
    }));

    it('supports uncertainty', inject(
        [FormatterService], (formatter: FormatterService) => {
      expect(formatter.depth(1.234, 'nm', 0.12)).toEqual(
          '1.2 nm&plusmn; 0.1');
    }));
  });

  describe('distance', () => {
    it('defers to number formatting', inject(
        [FormatterService], (formatter: FormatterService) => {
      const spy = spyOn(formatter, 'number').and.returnValue('number');
      formatter.distance(0, 'units');

      expect(spy).toHaveBeenCalled();
      expect(spy).toHaveBeenCalledWith(0, 1, '-', 'units');
    }));
  });

  describe('latitude', () => {
    it('returns empty value when undefined', inject(
        [FormatterService], (formatter: FormatterService) => {
      expect(formatter.latitude(null)).toEqual(formatter.empty);
    }));

    it('formats direction', inject(
        [FormatterService], (formatter: FormatterService) => {
      expect(formatter.latitude(1.2)).toEqual('1.200°N');
      expect(formatter.latitude(-1.2)).toEqual('1.200°S');
    }));
  });

  describe('leftpad', () => {
    it('does not pad longer strings', inject(
        [FormatterService], (formatter: FormatterService) => {
      expect(formatter.leftPad('longer string', 2, 'X'))
          .toEqual('longer string');
    }));

    it('pads out a shorter string', inject(
        [FormatterService], (formatter: FormatterService) => {
      expect(formatter.leftPad('short', 10, '-')).toEqual(
          '-----short');
    }));
  });

  describe('location', () => {
    it('formats as expected', inject(
        [FormatterService], (formatter: FormatterService) => {
      expect(formatter.location(1.23, 2.34)).toEqual(
        formatter.latitude(1.23) + ' ' +
        formatter.longitude(2.34)
      );

      expect(formatter.location(1.23, 2.34, 6)).toEqual(
        formatter.latitude(1.23, 6) + ' ' +
        formatter.longitude(2.34, 6)
      );
    }));
  });

  describe('longitude', () => {
    it('returns empty value when undefined', inject(
        [FormatterService], (formatter: FormatterService) => {
      expect(formatter.longitude(null)).toEqual(formatter.empty);
    }));

    it('formats direction', inject(
        [FormatterService], (formatter: FormatterService) => {
      expect(formatter.longitude(1.2)).toEqual('1.200°E');
      expect(formatter.longitude(-1.2)).toEqual('1.200°W');
    }));
  });

  describe('magnitude', () => {
    it('short-circuits no magnitude', inject(
        [FormatterService], (formatter: FormatterService) => {
      const spy = spyOn(formatter, 'number');
      const result = formatter.magnitude(null, null);

      expect(spy).not.toHaveBeenCalled();
      expect(result).toBe(formatter.empty);
    }));

    it('defers to number method', inject(
        [FormatterService], (formatter: FormatterService) => {
      const spy = spyOn(formatter, 'number').and.returnValue('number');

      formatter.magnitude(0, 'type');
      expect(spy).toHaveBeenCalledWith(0, null, 'type');

      formatter.magnitude(1, 'type');
      expect(spy).toHaveBeenCalledWith(1, null, 'type');

      formatter.magnitude(2, 'type');
      expect(spy).toHaveBeenCalledWith(2, null, 'type');
    }));
  });

  describe('number', () => {
    it('returns empty value when undefined', inject(
        [FormatterService], (formatter: FormatterService) => {
      expect(formatter.number(null, 1, 'empty')).toEqual('empty');
    }));

    it('does not round if no decimals',  inject(
        [FormatterService], (formatter: FormatterService) => {
      expect(formatter.number(1.23775, null)).toEqual('1.23775');
    }));

    it('uses decimals to round', inject(
        [FormatterService], (formatter: FormatterService) => {
      expect(formatter.number(1.2366, 3)).toEqual('1.237');
    }));

    it('supports units', inject(
        [FormatterService], (formatter: FormatterService) => {
      expect(formatter.number(1, 0, 'empty', 'units')).toEqual('1 units');
    }));
  });

  describe('time', () => {
    it('returns empty value when undefined', inject(
        [FormatterService], (formatter: FormatterService) => {
      expect(formatter.time(null)).toEqual(formatter.empty);
    }));

    it('formats time', inject(
        [FormatterService], (formatter: FormatterService) => {
      expect(formatter.time(testDate)).toEqual(
          '01:02:03');
      expect(formatter.time(new Date(testDate.getTime() + 10000))).toEqual(
          '01:02:13');
      expect(formatter.time(new Date(testDate.getTime() + 600000))).toEqual(
          '01:12:03');
      expect(formatter.time(new Date(testDate.getTime() + 36000000))).toEqual(
          '11:02:03');
    }));

    it('includes milliseconds when requested', inject(
        [FormatterService], (formatter: FormatterService) => {
      expect(formatter.time(testDate, true)).toEqual(
          '01:02:03.123');
      expect(formatter.time(new Date(testDate.getTime() - 30), true)).toEqual(
          '01:02:03.093');
      expect(formatter.time(new Date(testDate.getTime() - 120), true)).toEqual(
          '01:02:03.003');
    }));
  });

  describe('timezoneOffset', () => {
    it('returns empty string when undefined', inject(
        [FormatterService], (formatter: FormatterService) => {
      expect(formatter.timezoneOffset()).toEqual('');
    }));

    it('supports positive values', inject(
        [FormatterService], (formatter: FormatterService) => {
      expect(formatter.timezoneOffset(123)).toEqual('+02:03');
      expect(formatter.timezoneOffset(610)).toEqual('+10:10');
    }));

    it('supports negative values', inject(
        [FormatterService], (formatter: FormatterService) => {
      expect(formatter.timezoneOffset(-123)).toEqual('-02:03');
    }));
  });

  describe('uncertainty', () => {
    it('returns empty value when undefined', inject(
        [FormatterService], (formatter: FormatterService) => {
      expect(formatter.uncertainty(null, 1, 'empty')).toEqual('empty');
    }));

    it('uses decimals to round', inject(
        [FormatterService], (formatter: FormatterService) => {
      expect(formatter.uncertainty(1.2366, 3)).toEqual(
          '&plusmn; 1.237');
    }));

    it('supports units', inject(
        [FormatterService], (formatter: FormatterService) => {
      expect(formatter.uncertainty(1.2366, 3, 'empty', 'units')).toEqual(
          '&plusmn; 1.237 units');
    }));
  });
});
