import { Pipe, PipeTransform } from '@angular/core';

import { FormatterService } from '../core/formatter.service';


@Pipe({
  name: 'sharedDateTime'
})
export class DateTimePipe implements PipeTransform {


  constructor (public formatter: FormatterService) { }


  /**
   * Returns dateTime object based on a time input
   *
   * @param time
   *     Time input
   * @returns {string}
   */
  transform (time: any): string {

    let date = new Date(parseFloat(time));

    // check for valid date
    if (isNaN(date.getTime())) {
      date = null;
    }

    return this.formatter.dateTime(date);
  }

}
