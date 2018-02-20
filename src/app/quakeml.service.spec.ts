import { TestBed, getTestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { QuakemlService } from './quakeml.service';

describe('QuakemlService', () => {
  let httpClient,
      injector;

  // Sample product to process
  const PRODUCT = {
    contents: {
      'quakeml.xml': {url: 'url'}
    }
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        QuakemlService
      ]
    });

    injector = getTestBed();
    httpClient = injector.get(HttpTestingController);
  });

  afterEach(() => {
    httpClient.verify();
  });

  it('should be created', inject([QuakemlService], (service: QuakemlService) => {
    expect(service).toBeTruthy();
  }));


  describe('get', () => {
    it('handles success',
        inject([QuakemlService], (service: QuakemlService) => {
      const response = '';

      const spy = spyOn(service, 'parseResponse').and.returnValue({});
      service.get(PRODUCT);
      const request = httpClient.expectOne('url');
      request.flush(response);

      expect(spy).toHaveBeenCalled();

      const args = spy.calls.argsFor(0);
      expect(args[0]).toEqual(response);
    }));

    it('handles failure',
        inject([QuakemlService], (service: QuakemlService) => {

      service.get(PRODUCT);
      const request = httpClient.expectOne('url');
      request.flush('', {status: 500, statusText: 'Error'});

      service.quakeml$.subscribe((content) => {
        expect(content).toEqual(null);
        expect(service.error).toBeTruthy();
      });
    }));

    it('handles parseError',
        inject([QuakemlService], (service: QuakemlService) => {

      const spy = spyOn(service, 'parseResponse').and.throwError('test error');

      service.get(PRODUCT);
      const request = httpClient.expectOne('url');
      request.flush('', {status: 500, statusText: 'Error'});

      service.quakeml$.subscribe((content) => {
        expect(content).toEqual(null);
        expect(service.error).toEqual(new Error('test error'));
      });
    }));

    it('pushes null for bad usage',
        inject([QuakemlService], (service: QuakemlService) => {

      service.get(null);
      service.quakeml$.subscribe((parsed) => {
        expect(parsed).toBe(null);
      });
    }));
  });

  describe('parseResponse', () => {
    it('parses quakeml when response is not null',
        inject([QuakemlService], (service: QuakemlService) => {
      const quakeml = service.parseResponse(`
          <q:quakeml xmlns:q="namespace">
            <eventParameters>
              <creationInfo><creationTime>2018-01-01</creationTime></creationInfo>
            </eventParameters>
          </q:quakeml>`);
      expect(quakeml.creationInfo.creationTime).toEqual('2018-01-01');
    }));

    it('returns null when response is null',
        inject([QuakemlService], (service: QuakemlService) => {

      const quakeml = service.parseResponse(null);
      expect(quakeml).toBeNull();
    }));
  });

});
