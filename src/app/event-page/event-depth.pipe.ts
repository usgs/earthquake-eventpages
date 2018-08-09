import { Pipe, PipeTransform } from '@angular/core';

import { FormatterService } from '../core/formatter.service';


@Pipe({
  name: 'eventDepth'
})
export class EventDepthPipe implements PipeTransform {

  constructor (public formatter: FormatterService) { }


  /**
   * Returns the event depth based on the geometry coordinates
   *
   * @param event
   *     The event object
   * @param precision {optional}
   *     The decimal precision for depth
   *
   * @return
   *     A formatted depth with units appended to it
   */
  transform (event: any, precision?: number): string {
    let depth;

    try {
      depth = parseFloat(event.geometry.coordinates[2]);
    } catch {
      depth = NaN;
    }

    return this.formatter.depth(depth, 'km') + ' depth';
  }

}
