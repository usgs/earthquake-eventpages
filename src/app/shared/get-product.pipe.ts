import { Pipe, PipeTransform } from '@angular/core';
import { Event } from '../event';

@Pipe({
  name: 'getProduct'
})
export class GetProductPipe implements PipeTransform {

  transform(event: Event, type: string,
      source?: string, code?: string, updateTime?: number): any {
    if (!event) {
      return null;
    }
    return event.getProduct(type, source, code, updateTime);
  }

}
