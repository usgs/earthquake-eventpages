import {
  HttpClientTestingModule,
  HttpTestingController } from '@angular/common/http/testing';
import { TestBed, getTestBed, inject } from '@angular/core/testing';

import { MetadataService } from './metadata.service';


describe('MetadataService', () => {
  let httpClient,
      injector;

  // Sample product to process
  const PRODUCT = {
    contents: {
      'download/info.json': {url: 'url'}
    }
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [MetadataService]
    });

    injector = getTestBed();
    httpClient = injector.get(HttpTestingController);
  });

  it('should be created', inject([MetadataService],
        (service: MetadataService) => {
    expect(service).toBeTruthy();
  }));

  describe('getMetadata', () => {

    it('handles success',
        inject([MetadataService], (service: MetadataService) => {
      const response = '';

      const spy = spyOn(service, 'translate').and.returnValue({});
      service.getMetadata(PRODUCT);
      const request = httpClient.expectOne('url');
      request.flush(response);

      expect(spy).toHaveBeenCalled();

      const args = spy.calls.argsFor(0);
      expect(args[0]).toEqual(response);
    }));

    it('handles failure',
        inject([MetadataService], (service: MetadataService)  => {

      service.getMetadata(PRODUCT);
      const request = httpClient.expectOne('url');
      request.flush('', {status: 500, statusText: 'Error'});

      service.metadata$.subscribe((content) => {
        expect(content).toEqual(null);
        expect(service.error).toBeTruthy();
      });
    }));

    it('handles parse failure',
        inject([MetadataService], (service: MetadataService)  => {

      const spy = spyOn(service, 'onMetadata').and.throwError('test error');

      service.getMetadata(PRODUCT);
      const request = httpClient.expectOne('url');
      request.flush('', {status: 500, statusText: 'Error'});

      service.metadata$.subscribe((content) => {
        expect(content).toEqual(null);
        expect(service.error).toEqual(new Error('test error'));
      });

    }));

    it('handles null input',
        inject([MetadataService], (service: MetadataService)  => {

      service.getMetadata(null);

      service.metadata$.subscribe((content) => {
        expect(content).toEqual(null);
      });
    }));
  });

  describe('obj2Arr', () => {

    it('handles success',
        inject([MetadataService], (service: MetadataService) => {

      const test_obj = {'test_obj': {'header': 'value'}};
      const arr = service.obj2Arr(test_obj);

      expect(arr[0].type).toEqual('test_obj');
    }));
  });

  describe('translate', () => {

    it('handles success',
        inject([MetadataService], (service: MetadataService) => {

      let test_obj = {'output':
                        {'ground_motions': {
                          'test_obj': {'header': 'value'}
                          }
                        }
                      };

      test_obj = service.translate(test_obj);

      expect(test_obj.output.ground_motions[0].type).toEqual('test_obj');
    }));
  });

});
