import { PlotAttenPipe } from './plot-atten.pipe';

describe('PlotAttenPipe', () => {
  let pipe;

  const SAMPLEPLOTATTEN = {
    distances: {
      repi: [1,2,3,4],
      rhypo: [1,2,3,4],
      rjb: [1,2,3,4],
      rrup: [1,2,3,4]
    },
    eventid: 'hv70863117',
    gmpe: {
      rock: {
        MMI: {mean: [4, 3, 2, 1], stddev: [.1, .1, .1, .1]},
        PGA: {mean: [4, 3, 2, 1], stddev: [.1, .1, .1, .1]}},
      soil: {
        MMI: {mean: [4, 3, 2, 1], stddev: [.1, .1, .1, .1]},
        PGA: {mean: [4, 3, 2, 1], stddev: [.1, .1, .1, .1]}}
    },
    mean_bias: {}
  };

  beforeEach(() => {
    pipe = new PlotAttenPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  describe('transform', () => {
    it('Tranforms sample data', () => {
      const data = pipe.transform(SAMPLEPLOTATTEN, 'rrup', 'intensity', 'soil');
      expect(data).toBeTruthy();
    });

    it('handles null', () => {
      const result = pipe.transform(null, 'rrup', 'intensity', 'soil');
      expect(result.length).toEqual(0.0);
    });
  });

  describe('renameAccs', () => {
    it('changes imt names', () => {
      const result = pipe.renameAccs(SAMPLEPLOTATTEN);

      expect(result.gmpe.rock.intensity).toBeDefined();
      expect(result.gmpe.rock.pga).toBeDefined();
    });
  });

  describe('convert', () => {
    it('converts pga values from ln(g) to %g', () => {
      const result = pipe.convert(SAMPLEPLOTATTEN.gmpe.rock.PGA, 'pga');
      const expected = Math.exp(SAMPLEPLOTATTEN.gmpe.rock.PGA.mean[0]) * 100;

      expect(result[0].value).toBe(expected);
    });
  });
});
