import { Pipe, PipeTransform } from '@angular/core';

import { Event } from '../event';

@Pipe({
  name: 'sharedGetProducts'
})
export class GetProductsPipe implements PipeTransform {
  transform(event: Event, type: string): Array<any> {
    return event.getProducts(type);
  }
}
