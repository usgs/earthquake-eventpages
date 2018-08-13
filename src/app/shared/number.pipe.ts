import { Pipe, PipeTransform } from '@angular/core';

import { FormatterService } from '../core/formatter.service';

@Pipe({
  name: 'sharedNumber'
})
export class NumberPipe implements PipeTransform {
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
   *     formatted number
   */
  transform(
    value: any,
    decimals?: number,
    units = '',
    empty = this.formatter.empty
  ): any {
    // NOTE: FormatterService uses different argument order
    return this.formatter.number(value, decimals, empty, units);
  }
}
