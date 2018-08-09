import { Pipe, PipeTransform } from '@angular/core';

import { FormatterService } from '../core/formatter.service';


@Pipe({
  name: 'eventDateTime'
})
export class EventDateTimePipe implements PipeTransform {


  constructor (public formatter: FormatterService) { }


  /**
   * Returns an event date time from the event
   *
   * @param event
   *     The event object
   * @returns
   *     New date/time formatted object
   */
  transform (event: any): string {
    let date;

    try {
      date = new Date(parseFloat(event.properties.time));
    } catch (e) {
      date = null;
    }

    return this.formatter.dateTime(date);
  }

}
