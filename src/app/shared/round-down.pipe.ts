import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sharedRoundDown'
})
export class RoundDownPipe implements PipeTransform {
  /**
   * Rounds a number down to x significant digits
   *
   * @param value
   *     The value to change
   * @param significant
   *     Number of significant digits
   *
   * @returns {any}
   *     rounded number
   */
  transform(value: number, significant: number): any {
    let d, magnitude, power, shifted;

    if (value === 0) {
      return 0;
    }

    d = Math.ceil(Math.log10(value < 0 ? -value : value));
    power = significant - d;

    magnitude = Math.pow(10, power);
    shifted = Math.floor(value * magnitude);

    return shifted / magnitude;
  }
}
