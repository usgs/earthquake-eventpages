import { Pipe, PipeTransform } from '@angular/core';

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
      min = Number.EPSILON;
    }
    if (value <= 0) {
      value = Number.EPSILON;
    }

    return range * (Math.log(value) - Math.log(min)) / (Math.log(max) - Math.log(min));
  }

}
