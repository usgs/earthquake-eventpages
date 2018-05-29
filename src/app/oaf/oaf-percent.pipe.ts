import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'oafPercent'
})

export class OafPercentPipe implements PipeTransform {

  /**
   * Formats decimal percent value.
   *
   * @param value {any}
   *       Number or string to format
   * @return {string}
   *       Returns formatted number
   */
  transform(value: any): any {
    if (typeof value !== 'number') {
      value = parseFloat(value);
    }

    if (value > 0.99) {
      value = '> 99';
    } else if (value < 0.01) {
      value = '< 1';
    } else {
      value = Math.round(value * 100);
    }

    return value.toString() + ' %';
  }
}
