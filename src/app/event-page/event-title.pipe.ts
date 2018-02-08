import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'eventTitle'
})
export class EventTitlePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    const properties = value.properties || {};
    return `M ${properties.mag} - ${properties.place}`;
  }

}
