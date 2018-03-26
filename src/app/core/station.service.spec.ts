import { TestBed, getTestBed, inject  } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { StationService } from './station.service';

describe('StationService', () => {
  let httpClient,
      injector;

  // Sample product to process
  const PRODUCT = {
    contents: {
      'download/stationlist.json': {url: 'url'}
    }
  };

  // sample stations to process
  const STATIONS_JSON = {
    'type': 'FeatureCollection',
    'features': [
      {'type': 'feature',
        'properties': {
          'pga': 5.2
        }
      }
    ]
  };

  const OLD_STATIONS_JSON = {
    'type': 'FeatureCollection',
    'features': [
      {'type': 'feature',
        'properties': {
          'pga': 'null',
          'pgv': 'nan'
        }
      }
    ]
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [StationService]
    });

    injector = getTestBed();
    httpClient = injector.get(HttpTestingController);
  });

  it('should be created', inject([StationService], (service: StationService) => {
    expect(service).toBeTruthy();
  }));

  describe('getMetadata', () => {

    it('handles success',
        inject([StationService], (service: StationService) => {
      const response = '';

      expect(() => {
        service.getStations(PRODUCT);
        const request = httpClient.expectOne('url');
        request.flush(response);
      }).not.toThrowError();
    }));

    it('handles failure',
        inject([StationService], (service: StationService)  => {

      service.getStations(PRODUCT);
      const request = httpClient.expectOne('url');
      request.flush('', {status: 500, statusText: 'Error'});

      service.stationsJson$.subscribe((content) => {
        expect(content).toEqual(null);
        expect(service.error).toBeTruthy();
      });
    }));

    it('handles parse failure',
        inject([StationService], (service: StationService)  => {

      const spy = spyOn(service, 'onStations').and.throwError('test error');

      service.getStations(PRODUCT);
      const request = httpClient.expectOne('url');
      request.flush('', {status: 500, statusText: 'Error'});

      service.stationsJson$.subscribe((content) => {
        expect(content).toEqual(null);
        expect(service.error).toEqual(new Error('test error'));
      });

    }));

    it('handles null input',
        inject([StationService], (service: StationService)  => {

      service.getStations(null);

      service.stationsJson$.subscribe((content) => {
        expect(content).toEqual(null);
      });
    }));

  });

  describe('onStations', () => {

    it('handles parse success',
        inject([StationService], (service: StationService)  => {

      service.onStations(STATIONS_JSON);

      service.stationsJson$.subscribe((content) => {
        expect(content).toEqual(STATIONS_JSON);
      });

    }));

    it('handles old json',
        inject([StationService], (service: StationService)  => {

      service.onStations(OLD_STATIONS_JSON);

      service.stationsJson$.subscribe((content) => {
        expect(content.features[0].properties.pga).toEqual(null);
        expect(content.features[0].properties.pgv).toEqual(null);
      });

    }));

  });
});
