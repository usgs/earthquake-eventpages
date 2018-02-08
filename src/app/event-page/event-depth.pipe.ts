import { Pipe, PipeTransform } from '@angular/core';

import { FormatterService } from '../formatter.service';

@Pipe({
  name: 'eventDepth'
})
export class EventDepthPipe implements PipeTransform {

  constructor (public formatter: FormatterService) { }

  transform(event: any, precision?: number): string {
    let depth;

    try {
      depth = event.geometry.coordinates[2];
    } catch {
      depth = NaN;
    }

    return this.formatter.depth(depth, 'km') + ' depth';
  }

}
