import { Pipe, PipeTransform } from '@angular/core';

import { FormatterService } from '../core/formatter.service';

@Pipe({
  name: 'sharedDegrees'
})
export class DegreesPipe implements PipeTransform {
  constructor(public formatter: FormatterService) {}

  /**
   * Format a number
   *
   * @param value
   *     Number to format.
   * @param decimals Optional, default does not round.
   *     Number of decimal places to round.
   * @param empty Optional, default none.
   *     Value to return if value is empty.
   * @param units Optional, default none.
   *     Units of value.
   *
   * @return {String}
   *     Formatted degrees string
   */
  transform(
    value: any,
    decimals = 0,
    units = '°',
    empty = this.formatter.empty
  ): any {
    // NOTE: FormatterService uses different argument order
    const num = this.formatter.number(value, decimals, empty);
    return `${num}${units}`;
  }
}
