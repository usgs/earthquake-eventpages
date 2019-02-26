import { FeltReportResponseErrorDetails } from '../tell-us/felt-report-response-error-details';
import { FeltReportReponseError } from '../tell-us/felt-report-reponse-error';
import { FeltReportResponse } from '../tell-us/felt-report-response';
import { IsErrorResponsePipe } from './is-error-response.pipe';

describe('TypeCheckPipe', () => {
  it('create an instance', () => {
    const pipe = new IsErrorResponsePipe();
    expect(pipe).toBeTruthy();
  });

  it('checks for FeltReportResponse', () => {
    const response: FeltReportResponse = {
      ciim_mapLat: '30',
      ciim_mapLon: '20',
      ciim_time: '3 oclock',
      eventid: 'testEventId',
      form_version: '1.1.1',
      your_cdi: '3'
    };

    const errorResponseDetails: FeltReportResponseErrorDetails = {
      code: 500,
      message: 'Error Message'
    };

    const errorResponse: FeltReportReponseError = {
      error: errorResponseDetails
    };
    const pipe = new IsErrorResponsePipe();
    let isErrorResponse = pipe.transform(response);
    expect(isErrorResponse).toBeFalsy();
    isErrorResponse = pipe.transform(errorResponse);
    expect(isErrorResponse).toBeTruthy();
    isErrorResponse = pipe.transform(null);
    expect(isErrorResponse).toBeFalsy();
  });
});
