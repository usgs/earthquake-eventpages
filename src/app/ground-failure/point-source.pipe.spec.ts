import { PointSourcePipe } from './point-source.pipe';

describe('PointSourcePipe', () => {
  it('create an instance', () => {
    const pipe = new PointSourcePipe();
    expect(pipe).toBeTruthy();
  });

  describe('transform', () => {
    it('works as expected', () => {
      const pipe = new PointSourcePipe();

      expect(pipe.transform(undefined)).toBeFalsy();
      expect(pipe.transform(null)).toBeFalsy();
      expect(pipe.transform({})).toBeFalsy();
      expect(pipe.transform({ properties: {} })).toBeFalsy();
      expect(
        pipe.transform({ properties: { 'rupture-warning': undefined } })
      ).toBeFalsy();
      expect(
        pipe.transform({ properties: { 'rupture-warning': null } })
      ).toBeFalsy();

      expect(
        pipe.transform({ properties: { 'rupture-warning': 'false' } })
      ).toBeFalsy();
      expect(
        pipe.transform({ properties: { 'rupture-warning': 'FALSE' } })
      ).toBeFalsy();
      expect(
        pipe.transform({ properties: { 'rupture-warning': 'fAlSe' } })
      ).toBeFalsy();

      expect(
        pipe.transform({ properties: { 'rupture-warning': 'true' } })
      ).toBeTruthy();
      expect(
        pipe.transform({ properties: { 'rupture-warning': 'TRUE' } })
      ).toBeTruthy();
      expect(
        pipe.transform({ properties: { 'rupture-warning': 'tRuE' } })
      ).toBeTruthy();

      expect(
        pipe.transform({ properties: { 'rupture-warning': 'rando' } })
      ).toBeTruthy();
      expect(
        pipe.transform({ properties: { 'rupture-warning': '' } })
      ).toBeTruthy();
    });
  });
});
