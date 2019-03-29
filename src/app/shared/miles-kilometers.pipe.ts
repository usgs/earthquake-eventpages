import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'milesKilometers'
})
export class MilesKilometersPipe implements PipeTransform {
  transform(value: any, unitsFrom: string): any {
    const CONVERT_VALUE = 1.609;
    if (!value) {
      return null;
    }
    if (value && unitsFrom.toLowerCase() === 'miles') {
      return Math.abs(value / CONVERT_VALUE);
    }
    return Math.abs(value * CONVERT_VALUE);
  }
}
