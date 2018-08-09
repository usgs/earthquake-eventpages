import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'eventTitle'
})
export class EventTitlePipe implements PipeTransform {

  /**
   * Builds event title from the event
   *
   * @param event
   *     The event object
   *
   * @returns
   *     The event title
   */
  transform (event: any): any {
    const properties = event.properties || {};
    return `${properties.title}`;
  }

}
