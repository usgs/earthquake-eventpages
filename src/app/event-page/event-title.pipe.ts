import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'eventTitle'
})
export class EventTitlePipe implements PipeTransform {

  transform(event: any): any {
    const properties = event.properties || {};
    return `${properties.title}`;
  }

}
