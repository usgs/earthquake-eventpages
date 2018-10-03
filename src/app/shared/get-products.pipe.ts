import { Pipe, PipeTransform } from '@angular/core';

import { Event } from '../event';

@Pipe({
  name: 'sharedGetProducts'
})

/**
 * Returns the product from the event input based on the type input
 *
 * @param event
 *      The event which has the product
 * @param type
 *      The type of product to return
 *
 * @return product
 *      Product of type from event
 *
 */
export class GetProductsPipe implements PipeTransform {
  transform(event: Event, type: string): Array<any> {
    return event.getProducts(type);
  }
}
