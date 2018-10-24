import { ShakingImpactPipe } from './shaking-impact.pipe';

describe('ShakingImpactPipe', () => {
  let pipe;

  beforeEach(() => {
    pipe = new ShakingImpactPipe();
  });

  it('creates an instance', () => {});

  describe('transform', () => {
    it('handles "--"', () => {
      const result = pipe.transform('--');

      expect(result).toBe(pipe.defaultImpact);
    });

    it('handles "-"', () => {
      const result = pipe.transform('--');

      expect(result).toBe(pipe.defaultImpact);
    });

    it('handles mmi (round up)', () => {
      const mmi = 4.67;
      const result = pipe.transform(mmi);

      expect(result).toBe(pipe.mmiImpacts[5]);
    });

    it('handles mmi (round down)', () => {
      const mmi = 4.44;
      const result = pipe.transform(mmi);

      expect(result).toBe(pipe.mmiImpacts[4]);
    });

    it('handles null', () => {
      const result = pipe.transform(null);
      expect(result).toBe(pipe.defaultImpact);
    });

    it('returns null for unexpected values', () => {
      const result = pipe.transform('BAD_DESCRIPTION');
      expect(result).toBe(pipe.defaultImpact);
    });
  });
});
