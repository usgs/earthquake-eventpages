import { Pipe, PipeTransform } from '@angular/core';

import { FormatterService } from '@core/formatter.service';

@Pipe({
  name: 'sharedDirection'
})
export class DirectionPipe implements PipeTransform {
  constructor(public formatter: FormatterService) {}

  /**
   * Format an azimuth value into a compass direction
   *
   * @param value
   *     Number to format.
   * @param empty Optional, default none.
   *     Value to return if value is empty.
   *
   * @return {String}
   *     formatted compass direction
   */
  transform(value: any, empty = this.formatter.empty): any {
    const fullwind = 22.5;
    const directions = [
      'N',
      'NNE',
      'NE',
      'ENE',
      'E',
      'ESE',
      'SE',
      'SSE',
      'S',
      'SSW',
      'SW',
      'WSW',
      'W',
      'WNW',
      'NW',
      'NNW',
      'N'
    ];

    // if direction is already in compass points
    if (typeof value === 'string' && directions.indexOf(value) > -1) {
      return value;
    }

    // adjust azimuth if negative
    value = +value;
    while (value < 0) {
      value = value + 360;
    }

    return directions[Math.round((value % 360) / fullwind)];
  }
}
