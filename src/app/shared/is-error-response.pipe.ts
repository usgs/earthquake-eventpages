import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'isErrorResponsePipe'
})

/**
 * Checks an error response object to see if it has the error
 * property, and if so, if that property is a FeltReportResponseErrorDetails
 * object with code and message properties
 *
 * @returns whether or not error property exists
 */
export class IsErrorResponsePipe implements PipeTransform {
  transform(value: any): boolean {
    if (!value || value === null) {
      return false;
    }
    if (value.hasOwnProperty('error')) {
      return (
        value.error.hasOwnProperty('code') &&
        value.error.hasOwnProperty('message')
      );
    }
    return false;
  }
}
