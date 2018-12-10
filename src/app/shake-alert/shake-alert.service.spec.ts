import { getTestBed, inject, TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';

import { ShakeAlertService } from './shake-alert.service';

describe('ShakeAlertService', () => {
  let httpClient, injector;

  // Sample product to process
  const PRODUCT = {
    contents: {
      'summary.json': { url: 'summary.json' }
    }
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ShakeAlertService]
    });
    injector = getTestBed();
    httpClient = injector.get(HttpTestingController);
  });

  it('should be created', inject(
    [ShakeAlertService],
    (service: ShakeAlertService) => {
      expect(service).toBeTruthy();
    }
  ));

  describe('getSummary', () => {
    it('handles success', inject(
      [ShakeAlertService],
      (service: ShakeAlertService) => {
        const response = '';

        expect(() => {
          service.getSummary(PRODUCT);
          const request = httpClient.expectOne('summary.json');
          request.flush(response);
        }).not.toThrowError();
      }
    ));

    it('handles failure', inject(
      [ShakeAlertService],
      (service: ShakeAlertService) => {
        service.getSummary(PRODUCT);
        const request = httpClient.expectOne('summary.json');
        request.flush('', { status: 500, statusText: 'Error' });

        service.summary$.subscribe(content => {
          expect(content).toEqual(null);
          expect(service.error).toBeTruthy();
        });
      }
    ));

    it('handles null product', inject(
      [ShakeAlertService],
      (service: ShakeAlertService) => {
        service.getSummary({ contents: {} });

        service.summary$.subscribe(content => {
          expect(content).toEqual(null);
        });
      }
    ));
  });
});
