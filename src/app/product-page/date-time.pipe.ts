import { Pipe, PipeTransform } from '@angular/core';

import { FormatterService } from '../formatter.service';

@Pipe({
  name: 'dateTime'
})
export class DateTimePipe implements PipeTransform {

  constructor (public formatter: FormatterService) { }

  transform(time: any): string {
    let date;

    date = new Date(time);

    return this.formatter.dateTime(date);
  }
}
