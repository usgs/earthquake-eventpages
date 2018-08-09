import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'sharedRoundUp'
})
export class RoundUpPipe implements PipeTransform {

  /**
   * Rounds up a number to x significant digits
   *
   * @param value
   *     The value to round up
   * @param significant
   *     The number of significant decimal places
   *
   * @returns {any}
   *     rounded number
   */
  transform (value: number, significant: number): any {
    let d,
        magnitude,
        power,
        shifted;

    if (value === 0) {
      return 0;
    }

    d = Math.ceil(Math.log10(value < 0 ? -value : value));
    power = significant - (d);

    magnitude = Math.pow(10, power);
    shifted = Math.ceil(value * magnitude);

    return shifted / magnitude;
  }

}
