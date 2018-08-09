import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'eventTitle'
})
export class EventTitlePipe implements PipeTransform {


  /**
   * Event title pipe, returns the title property from the event
   *
   * @param event
   *     The event object
   * @returns
   *     Properties title
   */
  transform (event: any): any {
    const properties = event.properties || {};
    return `${properties.title}`;
  }

}
