import { getTestBed, inject, TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';

import { DyfiService } from './dyfi.service';

describe('DyfiService', () => {
  let httpClient, injector;

  // Sample product to process
  const PRODUCT = {
    contents: {
      'dyfi_plot_atten.json': { url: 'atten_url' },
      'dyfi_plot_numresp.json': { url: 'numresp_url' }
    }
  };

  const DYFIDATA = {
    datasets: [
      {
        class: 'scatterplot1',
        data: [{ x: 5, y: 5, stdev: 1 }],
        legend: 'All reported data',
        name: 'data1'
      },
      {
        class: 'scatterplot1',
        data: [{ x: 5, y: 5 }],
        name: 'data2'
      }
    ]
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DyfiService]
    });

    injector = getTestBed();
    httpClient = injector.get(HttpTestingController);
  });

  it('should be created', inject([DyfiService], (service: DyfiService) => {
    expect(service).toBeTruthy();
  }));

  describe('getAtten', () => {
    it('handles success', inject([DyfiService], (service: DyfiService) => {
      const response = '';

      expect(() => {
        service.getAtten(PRODUCT);
        const request = httpClient.expectOne('atten_url');
        request.flush(response);
      }).not.toThrowError();
    }));

    it('handles failure', inject([DyfiService], (service: DyfiService) => {
      service.getAtten(PRODUCT);
      const request = httpClient.expectOne('atten_url');
      request.flush('', { status: 500, statusText: 'Error' });

      service.plotAtten$.subscribe(content => {
        expect(content).toEqual(null);
        expect(service.error).toBeTruthy();
      });
    }));

    it('handles null product', inject([DyfiService], (service: DyfiService) => {
      service.getAtten({ contents: {} });

      service.plotAtten$.subscribe(content => {
        expect(content).toEqual(null);
      });
    }));
  });

  describe('getNumResp', () => {
    it('handles success', inject([DyfiService], (service: DyfiService) => {
      const response = '';

      expect(() => {
        service.getNumResp(PRODUCT);
        const request = httpClient.expectOne('numresp_url');
        request.flush(response);
      }).not.toThrowError();
    }));

    it('handles failure', inject([DyfiService], (service: DyfiService) => {
      service.getNumResp(PRODUCT);
      const request = httpClient.expectOne('numresp_url');
      request.flush('', { status: 500, statusText: 'Error' });

      service.plotNumResp$.subscribe(content => {
        expect(content).toEqual(null);
        expect(service.error).toBeTruthy();
      });
    }));

    it('handles null product', inject([DyfiService], (service: DyfiService) => {
      service.getNumResp({ contents: {} });

      service.plotNumResp$.subscribe(content => {
        expect(content).toEqual(null);
      });
    }));
  });

  describe('onData', () => {
    it('handles data', inject([DyfiService], (service: DyfiService) => {
      const result = service.onData(DYFIDATA);

      expect(result.series).toBeDefined();
    }));
  });
});
