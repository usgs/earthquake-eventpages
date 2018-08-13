import { GetBarPositionPipe } from './get-bar-position.pipe';

describe('GetBarPositionPipe', () => {
  it('create an instance', () => {
    const pipe = new GetBarPositionPipe();
    expect(pipe).toBeTruthy();
  });

  describe('transform', () => {
    const pipe = new GetBarPositionPipe();

    it('uses min when value too small', () => {
      expect(pipe.transform(-1, 1, 2, 10)).toBe(0);
    });

    it('uses max when value too large', () => {
      expect(pipe.transform(11, 1, 2, 10)).toBe(10);
    });

    it('uses epsilon when min is less than zero', () => {
      expect(() => {
        pipe.transform(1, -1, 2, 10);
      }).not.toThrowError();
    });

    it('uses epsilon when value is zero', () => {
      expect(() => {
        pipe.transform(-1, -2, 2, 10);
      }).not.toThrowError();
    });
  });
});
