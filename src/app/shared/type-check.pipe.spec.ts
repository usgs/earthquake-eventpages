import { FeltReportResponseErrorDetails } from './../tell-us/felt-report-response-error-details';
import { FeltReportReponseError } from './../tell-us/felt-report-reponse-error';
import { FeltReportResponse } from './../tell-us/felt-report-response';
import { TypeCheckPipe } from './type-check.pipe';

fdescribe('TypeCheckPipe', () => {
  it('create an instance', () => {
    const pipe = new TypeCheckPipe();
    expect(pipe).toBeTruthy();
  });

  it('checks for FeltReportResponse', () => {
    const response1: FeltReportResponse = {
      ciim_mapLat: '30',
      ciim_mapLon: '20',
      ciim_time: '3 oclock',
      eventid: 'testEventId',
      form_version: '1.1.1',
      your_cdi: '3'
    };

    const response2: FeltReportResponse = {
      ciim_mapLat: '10',
      ciim_mapLon: '30',
      ciim_time: 'Test Time',
      eventid: 'testEventId2',
      form_version: '1.1.1',
      your_cdi: '9'
    };

    const badErrorResponseDetails: FeltReportResponseErrorDetails = {
      code: 500,
      message: 'Error Message'
    };

    const badErrorResponse: FeltReportReponseError = {
      error: badErrorResponseDetails
    };
    const pipe = new TypeCheckPipe();
    const isFeltReportResponse = pipe.transform(response1, response2);
    expect(isFeltReportResponse).toBeTruthy();
  });
});
