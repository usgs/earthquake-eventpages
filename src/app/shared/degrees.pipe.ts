import { Pipe, PipeTransform } from '@angular/core';
import { FormatterService } from '../formatter.service';

@Pipe({
  name: 'sharedDegrees'
})
export class DegreesPipe implements PipeTransform {

  constructor(
    public formatter: FormatterService
  ) { }

  /**
   * Format a number.
   *
   * @param value {Number}
   *     Number to format.
   * @param decimals {Number} Optional, default does not round.
   *     Number of decimal places to round.
   * @param empty {Any} Optional, default none.
   *     Value to return if value is empty.
   * @param units {String} Optional, default none.
   *     Units of value.
   *
   * @return {String}
   */
  transform(
      value: any,
      decimals = 0,
      units = '°',
      empty = this.formatter.empty): any {
    // NOTE: FormatterService uses different argument order
    return this.formatter.number(value, decimals, empty, units);
  }
}
