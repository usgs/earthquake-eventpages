import { Pipe, PipeTransform } from '@angular/core';

import { FormatterService } from '@core/formatter.service';
import { MilesKilometersPipe } from '@shared/miles-kilometers.pipe';

@Pipe({
  name: 'sharedDistance'
})
/**
 * Transform a distance (in kilometers) to a string that shows
 * distance in both kilometers and miles.
 *
 * @param value number
 *    distance in kilometers
 */
export class DistancePipe implements PipeTransform {
  constructor(public formatter: FormatterService) {}

  transform(value: number, decimals = 0, empty = this.formatter.empty): any {
    if (!value) {
      return empty;
    }
    const milesKilometersPipe = new MilesKilometersPipe();

    return (
      this.formatter.number(value, decimals) +
      ' km ' +
      '(' +
      this.formatter.number(
        milesKilometersPipe.transform(value, 'tomiles'),
        decimals
      ) +
      ' mi)'
    );
  }
}
