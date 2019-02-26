import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'isErrorResponsePipe'
})

/**
 * Checks an error response object to see if it has the error
 * property
 *
 * @returns whether or not error property exists
 */
export class IsErrorResponsePipe implements PipeTransform {
  transform(value: any): boolean {
    if (!value || value === null) {
      return false;
    }
    return value.hasOwnProperty('error');
  }
}
