import { Pipe, PipeTransform } from '@angular/core';

/**
 * Pipe for converting and displaying either miles to km, or vice versa
 *
 * @param value, the value to convert as a number
 * @param unitsFrom, the units to convert from, either tomiles or tokilometers
 * @return null | number, miles converted to kilos or vice versa
 */
@Pipe({
  name: 'sharedMilesKilometers'
})
export class MilesKilometersPipe implements PipeTransform {
  transform(value: number, unitsFrom: string): any {
    const CONVERT_VALUE = 1.609344;
    if (!value) {
      return null;
    }
    if (value && unitsFrom) {
      if (unitsFrom.toLowerCase() === 'tomiles') {
        return Math.abs(value / CONVERT_VALUE);
      }
      if (unitsFrom.toLowerCase() === 'tokilometers') {
        return Math.abs(value * CONVERT_VALUE);
      }
    }
    return Math.abs(value * CONVERT_VALUE);
  }
}
