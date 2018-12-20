import { RomanToNumberPipe } from './roman-to-number.pipe';

describe('RomanToNumberPipe', () => {
  it('create an instance', () => {
    const pipe = new RomanToNumberPipe();
    expect(pipe).toBeTruthy();
  });

  it('returns null with null input', () => {
    const pipe = new RomanToNumberPipe();
    const result = pipe.transform(null);
    expect(result).toBeNull();
  });

  it('returns null with non-string inputs', () => {
    const pipe = new RomanToNumberPipe();
    const result = pipe.transform(1);
    expect(result).toBeNull();
    const resultBool = pipe.transform(true);
    expect(resultBool).toBeNull();
    const resultUndefined = pipe.transform(undefined);
    expect(resultUndefined).toBeNull();
  });

  it('returns null with non-roman string input', () => {
    const pipe = new RomanToNumberPipe();
    const result = pipe.transform('test');
    expect(result).toBeNull();
  });

  it('returns null with roman value > XII', () => {
    const pipe = new RomanToNumberPipe();
    const result = pipe.transform('XIII');
    expect(result).toBeNull();
  });

  describe('Valid Roman Numerals', () => {
    const pipe = new RomanToNumberPipe();
    it('returns 1 for I input', () => {
      expect(pipe.transform('I')).toEqual(1);
    });
    it('returns 2 for II input', () => {
      expect(pipe.transform('II')).toEqual(2);
    });
    it('returns 3 for III input', () => {
      expect(pipe.transform('III')).toEqual(3);
    });
    it('returns 4 for IV input', () => {
      expect(pipe.transform('IV')).toEqual(4);
    });
    it('returns 5 for V input', () => {
      expect(pipe.transform('V')).toEqual(5);
    });
    it('returns 6 for VI input', () => {
      expect(pipe.transform('VI')).toEqual(6);
    });
    it('returns 7 for VII input', () => {
      expect(pipe.transform('VII')).toEqual(7);
    });
    it('returns 8 for VIII input', () => {
      expect(pipe.transform('VIII')).toEqual(8);
    });
    it('returns 9 for IX input', () => {
      expect(pipe.transform('IX')).toEqual(9);
    });
    it('returns 10 for X input', () => {
      expect(pipe.transform('X')).toEqual(10);
    });
    it('returns 11 for XI input', () => {
      expect(pipe.transform('XI')).toEqual(11);
    });
    it('returns 12 for XII input', () => {
      expect(pipe.transform('XII')).toEqual(12);
    });
  });
});
