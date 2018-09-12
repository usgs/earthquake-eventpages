import { FetchNearbyCitiesPipe } from './fetch-nearby-cities.pipe';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

describe('FetchNearbyCitiesPipe', () => {
  let pipe, service;

  beforeEach(() => {
    const cities = [
      {
        admin1_code: 'NM',
        admin1_name: 'New Mexico',
        azimuth: 162.7,
        country_code: 'US',
        country_name: 'United States',
        distance: 2.736,
        elevation: 1633,
        feature_class: 'P',
        feature_code: 'PPL',
        latitude: 34.97645,
        longitude: -104.99111,
        name: 'Vegas Junction',
        population: 0
      }
    ];

    service = {
      get: jasmine.createSpy()
    };

    pipe = new FetchNearbyCitiesPipe(service);
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  fdescribe('transform', () => {
    it('returns as output what was provided as input', () => {
      const obj = {};
      expect(pipe.transform(obj)).toBe(obj);
    });

    it('triggers service get', () => {
      const obj = {};
      pipe.transform(obj);

      expect(service.get).toHaveBeenCalledWith(obj);
    });
  });
});
