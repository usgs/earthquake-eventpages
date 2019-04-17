import { Pipe, PipeTransform } from '@angular/core';

import { FormatterService } from '@core/formatter.service';

@Pipe({
  name: 'sharedDateTime'
})
export class DateTimePipe implements PipeTransform {
  constructor(public formatter: FormatterService) {}

  /**
   * Format dateTime object based on a time input
   *
   * @param time
   *     Time to be transformed into a timestamp. Must be a format readable
   *     by the Date JavaScript object
   * @param minutesOffset {Number} Optional, default 0
   *     UTC offset in minutes. 0 for UTC
   * @param includeMilliseconds {Boolean} Optional, default false
   *     Whether to output milliseconds
   *
   * @return {string}
   *     formatted date/time string. Ex: '2018-08-31 23:05:43 (UTC)'
   */
  transform(time: any, minutesOffset = 0, includeMilliseconds = false): string {
    let date = new Date(time);

    // check for valid date
    if (isNaN(date.getTime()) || (!time && time !== 0)) {
      date = null;
    }

    return this.formatter.dateTime(date, minutesOffset, includeMilliseconds);
  }
}
