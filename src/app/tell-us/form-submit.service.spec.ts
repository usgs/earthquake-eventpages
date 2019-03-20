import { TestBed, getTestBed, inject } from '@angular/core/testing';
import { HttpErrorResponse } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';

import { FormSubmitService } from './form-submit.service';
import { FeltReport } from './felt-report';
import { FeltReportResponse } from './felt-report-response';
import { FeltReportReponseError } from './felt-report-reponse-error';
import { GeoService } from '@shared/geo.service';

describe('FormSubmitService', () => {
  let httpClient: HttpTestingController, injector: TestBed;

  beforeEach(() => {
    const geoServiceStub = {
      method$: {
        value: 'map'
      }
    };

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        FormSubmitService,
        { provide: GeoService, useValue: geoServiceStub }
      ]
    });

    injector = getTestBed();
    httpClient = injector.get(HttpTestingController);
  });

  afterEach(() => {
    httpClient.verify();
  });

  it('should be created', () => {
    const service: FormSubmitService = TestBed.get(FormSubmitService);
    expect(service).toBeTruthy();
  });

  describe('onSubmit', () => {
    let feltReport: FeltReport,
      feltResponseSucces: FeltReportResponse,
      feltResponseError: FeltReportReponseError;

    // Felt Report Mock
    feltReport = new FeltReport();
    feltReport.fldSituation_felt = 0;
    feltReport.ciim_time = '5 minutes ago';
    feltReport.location = {
      address: 'test',
      confidence: 0,
      latitude: 35,
      longitude: -105
    };

    // Success Response
    feltResponseSucces = {
      ciim_mapLat: '35',
      ciim_mapLon: '-105',
      ciim_time: 'five minutes ago',
      eventid: '1234abcd',
      form_version: '1.2.3',
      your_cdi: 'I'
    };

    // Error Response
    feltResponseError = new HttpErrorResponse({
      status: 500,
      statusText: 'Server Error'
    });

    it('handles successes', inject(
      [FormSubmitService],
      (service: FormSubmitService) => {
        service.onSubmit(feltReport);
        const req = httpClient.expectOne(service.responseUrl);
        req.flush(feltResponseSucces);

        service.formResponse$.subscribe(response => {
          expect(response).toEqual(feltResponseSucces);
        });
      }
    ));

    it('handles errors', inject(
      [FormSubmitService],
      (service: FormSubmitService) => {
        spyOn(service, 'createErrorResponse');
        service.onSubmit(feltReport);
        const req = httpClient.expectOne(service.responseUrl);
        req.flush(feltResponseError);

        service.formResponse$.subscribe(response => {
          expect(response).toEqual(feltResponseError);
        });
      }
    ));
  });

  describe('createErrorResponse', () => {
    it('calls next on formResponse$', inject(
      [FormSubmitService],
      (service: FormSubmitService) => {
        const code = 500;
        const message = 'Server Error';

        service.createErrorResponse(code, message);
        service.formResponse$.subscribe((response: FeltReportReponseError) => {
          expect(response.error.code).toEqual(code);
          expect(response.error.message).toEqual(message);
        });
      }
    ));
  });
});
