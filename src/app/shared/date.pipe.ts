import { Pipe, PipeTransform } from '@angular/core';

import { FormatterService } from '../core/formatter.service';

@Pipe({
  name: 'sharedDate'
})
export class DatePipe implements PipeTransform {

  constructor (public formatter: FormatterService) { }

  transform(time: any): string {
    let date;

    try {
      date = new Date(time);
    } catch (e) {
      date = null;
    }

    return this.formatter.dateTime(date);
  }
}
