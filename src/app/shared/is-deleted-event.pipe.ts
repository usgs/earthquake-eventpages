import { Pipe, PipeTransform } from '@angular/core';

/**
 * Checks event status to return boolean if event is deleted or not
 */
@Pipe({
  name: 'isDeletedEvent'
})
export class IsDeletedEventPipe implements PipeTransform {
  transform(event: any): any {
    if (event && event.properties && event.properties.status) {
      return event.properties.status.toLowerCase() === 'deleted';
    }
    return false;
  }
}
