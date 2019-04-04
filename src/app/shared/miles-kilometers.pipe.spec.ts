import { MilesKilometersPipe } from './miles-kilometers.pipe';

describe('MilesKilometersPipe', () => {
  const pipe = new MilesKilometersPipe();
  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('returns null with null input', () => {
    const value = pipe.transform(null, 'test');
    expect(value).toBeNull();
  });

  it('converts miles to kilometers with misspelled 2nd arg', () => {
    const value = pipe.transform(15, 'tonkilometrs');
    expect(value).toBeCloseTo(24.14);
  });

  describe('converts miles to kilometers', () => {
    it('converts miles to kilometers with tokilometers as second arg', () => {
      const value = pipe.transform(15, 'tokilometers');
      expect(value).toBeCloseTo(24.14);
    });
    it('converts miles to kilometers with null 2nd arg by default', () => {
      const value = pipe.transform(11, null);
      expect(value).toBeCloseTo(17.7);
    });
    it('converts miles to kilometers with undefined 2nd arg by default', () => {
      const value = pipe.transform(11, undefined);
      expect(value).toBeCloseTo(17.7);
    });
    it('is not case sensitive with miles to kilometers arg', () => {
      const value = pipe.transform(25, 'ToKilOMeTers');
      expect(value).toBeCloseTo(40.23);
    });
  });

  describe('converts kilometers to miles', () => {
    it('converts kilometers to miles with tomiles as second arg', () => {
      const value = pipe.transform(17.7028, 'tomiles');
      expect(value).toBeCloseTo(11);
    });
    it('is not case sensitive with kilos to miles arg', () => {
      const value = pipe.transform(8, 'tOMiLEs');
      expect(value).toBeCloseTo(4.97);
    });
  });
});
