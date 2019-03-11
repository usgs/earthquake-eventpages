import { PlotStationsPipe } from './plot-stations.pipe';

describe('PlotStationsPipe', () => {
  let pipe: PlotStationsPipe;
  const STATIONS = [
    {properties: {
      distance: 3,
      distances: {
        rrup: 5
      },
      intensity: 5,
      pga: 5,
      predictions: [
        {name: 'mmi', value: 1},
        {name: 'pga', value: 1.5}
      ],
      station_type: 'macroseismic'
    }},
    {properties: {
      distance: 3,
      distances: {
        rrup: 5
      },
      intensity: 5,
      pga: 5,
      predictions: [
        {name: 'mmi', value: 1},
        {name: 'pga', value: 1.5}
      ],
      station_type: 'seismic'
    }}
  ];

  beforeEach(() => {
    pipe = new PlotStationsPipe();
    expect(pipe).toBeTruthy();
  });
  it('create an instance', () => {
  });

  describe('getPredictedValue', () => {
    it('grabs mmi with intensity input', () => {
      const expected = pipe
          .getPredictedValue(STATIONS[0].properties, 'intensity');
      expect(expected).toBe(STATIONS[0].properties.predictions[0].value);
    });
    it('grabs non-intensity imt', () => {
      const expected = pipe
          .getPredictedValue(STATIONS[0].properties, 'pga');
      expect(expected).toBe(STATIONS[0].properties.predictions[1].value);
    });
  });

  describe('getResidual', () => {
    it('grabs mmi with intensity input', () => {
      const expected = pipe
          .getResidual(STATIONS[0].properties, 'intensity', false);
      expect(expected).toBe(
          STATIONS[0].properties.intensity -
          STATIONS[0].properties.predictions[0].value);
    });
    it('grabs non-intensity imt', () => {
      const expected = pipe
          .getResidual(STATIONS[0].properties, 'pga', false);
      expect(expected).toBe(
          STATIONS[0].properties.pga -
          STATIONS[0].properties.predictions[1].value);
    });
    it('ratio works', () => {
      const expected = pipe
          .getResidual(STATIONS[0].properties, 'pga', true);
      expect(expected).toBe(
          STATIONS[0].properties.pga /
          STATIONS[0].properties.predictions[1].value);
    });
  });

  describe('transform', () => {
    it('runs', () => {
      const result = pipe.transform(STATIONS, 'rrup', 'intensity');
      expect(result.length).toBe(4);
    });

    it('Separates DYFI and station data', () => {
      const result = pipe.transform(STATIONS, 'rrup', 'intensity');
      expect(result[0].series.length).toBe(1);
      expect(result[1].series.length).toBe(1);
    });

    it('Generates predictions', () => {
      const result = pipe.transform(STATIONS, 'rrup', 'intensity');
      expect(result[2].series.length).toBe(1);
      expect(result[3].series.length).toBe(1);
    });

    it('defaults to "distance" property', () => {
      const noDistances = STATIONS;
      noDistances[0].properties.distances = null;
      noDistances[1].properties.distances = null;

      const result = pipe.transform(noDistances, 'rrup', 'mmi');
      expect(result.length).toBe(4);
    });
  });
});
