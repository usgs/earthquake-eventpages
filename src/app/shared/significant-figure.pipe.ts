import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sharedSignificantFigure'
})
export class SignificantFigurePipe implements PipeTransform {
  /**
   * Get significant figure from the magnitude
   *
   * @param value
   *     The magnitude
   *
   * @param significant
   *     The significant number of digits
   *
   * @return {any}
   *     magnitude shifted to show only significant digits
   */
  transform(value: any, significant: number): any {
    let d, magnitude, power, shifted;

    if (value === 0) {
      return 0;
    }

    d = Math.ceil(Math.log10(value < 0 ? -value : value));
    power = significant - d;

    magnitude = Math.pow(10, power);
    shifted = Math.round(value * magnitude);

    return shifted / magnitude;
  }
}
