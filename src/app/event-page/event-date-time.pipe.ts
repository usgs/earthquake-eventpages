import { Pipe, PipeTransform } from '@angular/core';

import { FormatterService } from '../formatter.service';

@Pipe({
  name: 'eventDateTime'
})
export class EventDateTimePipe implements PipeTransform {

  constructor (public formatter: FormatterService) { }

  transform(event: any): string {
    let date;

    try {
      date = new Date(parseFloat(event.properties.time));
    } catch (e) {
      date = null;
    }

    return this.formatter.dateTime(date);
  }
}
