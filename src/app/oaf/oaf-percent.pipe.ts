import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'oafPercent'
})
export class OafPercentPipe implements PipeTransform {

  /**
   * Formats decimal percent value.
   *
   * @param value {number}
   *       Number to format
   * @return {string}
   *       Returns formatted number
   */
  transform(value: number): any {
    value = Math.round(value * 100);

    if (value > 99) {
      return '> 99';
    } else if (value < 1 ) {
      return '< 1';
    } else {
      return value;
    }
  }
}
