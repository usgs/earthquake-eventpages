import { RomanPipe } from './roman.pipe';

describe('RomanPipe', () => {
  it('create an instance', () => {
    const pipe = new RomanPipe();
    expect(pipe).toBeTruthy();
  });

  describe('transform', () => {
    it('returns the roman numeral corresponding to the value', () => {
      const pipe = new RomanPipe();

      expect(pipe.transform(0)).toEqual('I');
      expect(pipe.transform(1)).toEqual('I');
      expect(pipe.transform(2)).toEqual('II');
      expect(pipe.transform(3)).toEqual('III');
      expect(pipe.transform(4)).toEqual('IV');
      expect(pipe.transform(5)).toEqual('V');
      expect(pipe.transform(6)).toEqual('VI');
      expect(pipe.transform(7)).toEqual('VII');
      expect(pipe.transform(8)).toEqual('VIII');
      expect(pipe.transform(9)).toEqual('IX');
      expect(pipe.transform(10)).toEqual('X');
      expect(pipe.transform(11)).toEqual('XI');
      expect(pipe.transform(11.49)).toEqual('XI');
      expect(pipe.transform(11.5)).toEqual('XII');
      expect(pipe.transform(12)).toEqual('XII');

      expect(pipe.transform(-1)).toBeNull();
      expect(pipe.transform(13)).toBeNull();
    });
  });
});
