import { Pipe, PipeTransform } from '@angular/core';

import { Event } from '../event';

@Pipe({
  name: 'sharedHasProduct'
})

/**
 * Checks to see if event has a given product
 *
 * @param event
 *      The given event
 * @param type
 *      The type of product to check for
 *
 * @return boolean
 *    true or false
 */
export class HasProductPipe implements PipeTransform {
  transform(event: Event, type: string): any {
    return event.hasProducts(type);
  }
}
