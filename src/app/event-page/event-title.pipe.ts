import { Pipe, PipeTransform } from '@angular/core';

import { Event } from '../event';


@Pipe({
  name: 'eventTitle'
})
export class EventTitlePipe implements PipeTransform {


  /**
   * Event title pipe, returns the title property from the event
   * @param event
   *     The event object
   */
  transform (event: any): any {
    const properties = event.properties || {};
    return `${properties.title}`;
  }

}
