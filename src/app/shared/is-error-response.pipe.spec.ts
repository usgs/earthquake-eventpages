import { FeltReportResponseErrorDetails } from '../tell-us/felt-report-response-error-details';
import { FeltReportReponseError } from '../tell-us/felt-report-reponse-error';
import { FeltReportResponse } from '../tell-us/felt-report-response';
import { IsErrorResponsePipe } from './is-error-response.pipe';

describe('isErrorResponsePipe', () => {
  it('create an instance', () => {
    const pipe = new IsErrorResponsePipe();
    expect(pipe).toBeTruthy();
  });

  describe('checks for FeltReportResponse', () => {
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

    const undefinedErrorResponseDetails: FeltReportResponseErrorDetails = {
      code: undefined,
      message: undefined
    };

    const nullErrorResponseDetails: FeltReportResponseErrorDetails = {
      code: null,
      message: null
    };

    const errorResponse: FeltReportReponseError = {
      error: errorResponseDetails
    };

    const undefinedErrorResponseProperties: FeltReportReponseError = {
      error: undefinedErrorResponseDetails
    };

    const nullErrorResponseProperties: FeltReportReponseError = {
      error: nullErrorResponseDetails
    };

    const someObject = {
      prop1: 'prop1',
      prop2: 'prop2'
    };

    const pipe = new IsErrorResponsePipe();

    describe('Different object types', () => {
      it('Returns true with a FeltReportErrorResponse object', () => {
        const isErrorResponse = pipe.transform(errorResponse);
        expect(isErrorResponse).toBeTruthy();
      });
      it('Returns true with undefined Details properties', () => {
        const isErrorResponse = pipe.transform(
          undefinedErrorResponseProperties
        );
        expect(isErrorResponse).toBeTruthy();
      });
      it('Returns true with null Details properties', () => {
        const isErrorResponse = pipe.transform(nullErrorResponseProperties);
        expect(isErrorResponse).toBeTruthy();
      });
      it('Returns false with a FeltReportResponse object', () => {
        const isErrorResponse = pipe.transform(response);
        expect(isErrorResponse).toBeFalsy();
      });
      it('Returns false for null input', () => {
        const isErrorResponse = pipe.transform(null);
        expect(isErrorResponse).toBeFalsy();
      });
      it('Returns false for a random object', () => {
        const isErrorResponse = pipe.transform(someObject);
        expect(isErrorResponse).toBeFalsy();
      });
      it('Returns false with undefined input', () => {
        const isErrorResponse = pipe.transform(undefined);
        expect(isErrorResponse).toBeFalsy();
      });
    });
  });
});
