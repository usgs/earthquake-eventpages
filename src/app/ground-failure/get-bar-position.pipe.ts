import { Pipe, PipeTransform } from '@angular/core';

/**
 * Find the position on the bar for the provided value
 *
 * @param max
 *     Maximum value on the bar
 *
 * @param min
 *     Minimum value on the bar
 *
 * @param range
 *    The total range of binned values
 *
 * @param value
 *     Value to plot on the bar
 *
 */
@Pipe({
  name: 'getBarPosition'
})
export class GetBarPositionPipe implements PipeTransform {

  transform(value: number, min: number, max: number, range: number): any {
    if (value < min) {
      value = min;
    } else if (value > max) {
      value = max;
    }

    if (min <= 0) {
      min = Number.MIN_VALUE;
    }
    if (value <= 0) {
      value = Number.MIN_VALUE;
    }

    return range * (Math.log(value) - Math.log(min)) / (Math.log(max) - Math.log(min));
  }

}
