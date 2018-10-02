import { Pipe, PipeTransform } from '@angular/core';

import { Event } from '../event';

@Pipe({
  name: 'sharedHasProduct'
})
export class HasProductPipe implements PipeTransform {
  transform(event: Event, type: string): any {
    return event.hasProducts(type);
  }
}
