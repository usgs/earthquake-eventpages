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

      service.getStations(PRODUCT);
      const request = httpClient.expectOne('url');
      request.flush(response);

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

    it('handles null input',
        inject([StationService], (service: StationService)  => {

      service.getStations(null);

      service.stationsJson$.subscribe((content) => {
        expect(content).toEqual(null);
      });
    }));

  });
});
