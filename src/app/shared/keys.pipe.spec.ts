import { KeysPipe } from './keys.pipe';

describe('KeysPipe', () => {
  it('create an instance', () => {
    const pipe = new KeysPipe();
    expect(pipe).toBeTruthy();
  });

  describe('transform', () => {
    it('returns null if value is falsy', () => {
      const pipe = new KeysPipe();
      expect(pipe.transform(false)).toBeNull();
      expect(pipe.transform(null)).toBeNull();
      expect(pipe.transform(undefined)).toBeNull();
    });

    it('returns object keys', () => {
      const pipe = new KeysPipe();
      const test = { a: 1, b: 2, c: 3 };
      expect(pipe.transform(test)).toEqual(Object.keys(test));
    });
  });
});
