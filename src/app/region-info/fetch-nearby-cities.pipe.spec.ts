import { FetchNearbyCitiesPipe } from './fetch-nearby-cities.pipe';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

describe('FetchNearbyCitiesPipe', () => {
  let service;

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
      cities$: new BehaviorSubject<any>(null),
      get: (product: any) => {
        if (product) {
          this.cities$.next(cities);
        } else {
          this.cities$.next(null);
        }
      }
    };
  });

  it('create an instance', () => {
    const pipe = new FetchNearbyCitiesPipe(service);
    expect(pipe).toBeTruthy();
  });
});
