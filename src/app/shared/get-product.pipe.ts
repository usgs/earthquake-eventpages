import { Pipe, PipeTransform } from '@angular/core';

import { Event } from '../event';


@Pipe({
  name: 'getProduct'
})
export class GetProductPipe implements PipeTransform {


  /**
   * Returns the product from the event input based on type input
   * @param event
   *     The event to get product from
   * @param type
   *     The type of product to return
   * @param source
   *     Event source
   * @param code
   *     Event code
   * @param updateTime
   *     Time last updated, if exists
   * @returns {any}
   */
  transform (event: Event, type: string,
      source?: string, code?: string, updateTime?: number): any {
    if (!event) {
      return null;
    }
    return event.getProduct(type, source, code, updateTime);
  }

}
