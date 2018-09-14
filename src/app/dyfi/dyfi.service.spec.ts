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
      'cdi_zip.xml': { url: 'cdi_url' },
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

  const DYFIREPEATDATA = {
    datasets: [
      {
        class: 'repeater',
        data: [
          { x: 5, y: 5, stdev: 1 },
          { x: 5, y: 6, stdev: 1 },
          { x: 6, y: 7, stdev: 1 }
        ],
        legend: 'All reported data',
        name: 'data1'
      }
    ]
  };

  const CDIDATA = `
      <cdidata><cdi type="zip">
        <location name="89032">
          <cdi>1</cdi>
          <nresp>1</nresp>
          <dist>331</dist>
          <lat>36.2210305209</lat>
          <lon>-115.175568715</lon>
          <name>North Las Vegas</name>
          <state>NV</state>
        </location>
        <location name="state::country">
          <cdi>1</cdi>
          <nresp>1</nresp>
          <dist>331</dist>
          <lat>36.2210305209</lat>
          <lon>-115.175568715</lon>
          <name>North Las Vegas</name>
          <state>NV</state>
        </location>
      </cdidata>
    `;

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
      const response = null;

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

    it('handles empty product',
        inject([DyfiService], (service: DyfiService) => {
      service.getNumResp({ contents: {} });

      service.plotNumResp$.subscribe(content => {
        expect(content).toEqual(null);
      });
    }));

    it('handles bad response', inject([DyfiService], (service: DyfiService) => {
      const response = '';

      expect(() => {
        service.getNumResp(PRODUCT);
        const request = httpClient.expectOne('numresp_url');
        request.flush(response);
      }).not.toThrowError();
    }));
  });

  describe('getCdi', () => {
    it('handles success', inject([DyfiService], (service: DyfiService) => {
      const response = '';

      expect(() => {
        service.getCdi(PRODUCT);
        const request = httpClient.expectOne('cdi_url');
        request.flush(response);
      }).not.toThrowError();
    }));

    it('handles failure', inject([DyfiService], (service: DyfiService) => {
      service.getCdi(PRODUCT);
      const request = httpClient.expectOne('cdi_url');
      request.flush('', { status: 500, statusText: 'Error' });

      service.cdiZip$.subscribe(content => {
        expect(content).toEqual(null);
        expect(service.error).toBeTruthy();
      });
    }));

    it('handles null product', inject([DyfiService], (service: DyfiService) => {
      service.getCdi({ contents: {} });

      service.cdiZip$.subscribe(content => {
        expect(content).toEqual(null);
      });
    }));

    it('handles bad response', inject([DyfiService], (service: DyfiService) => {
      const response = {};

      expect(() => {
        service.getCdi(PRODUCT);
        const request = httpClient.expectOne('cdi_url');
        request.flush(response);
      }).not.toThrowError();
    }));
  });

  describe('onData', () => {
    it('handles data', inject([DyfiService], (service: DyfiService) => {
      const result = service.onData(DYFIDATA);

      expect(result.series).toBeDefined();
    }));

    it('handles repeat data', inject([DyfiService], (service: DyfiService) => {
      const result = service.onData(DYFIREPEATDATA);

      expect(result.series[0].series.length)
          .toBe(DYFIREPEATDATA.datasets[0].data.length - 1);
    }));
  });

  describe('translateCdi', () => {
    it('handles data', inject([DyfiService], (service: DyfiService) => {
      const result = service.translateCdi(CDIDATA);

      expect(result).toBeDefined();
    }));
  });
});
