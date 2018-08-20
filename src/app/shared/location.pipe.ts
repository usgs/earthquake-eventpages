import { Pipe, PipeTransform } from '@angular/core';

import { FormatterService } from '@core/formatter.service';

@Pipe({
  name: 'sharedLocation'
})
export class LocationPipe implements PipeTransform {
  constructor(public formatter: FormatterService) {}

  /**
   * Returns a formatted location based on the input coordinates
   *
   * @param coordinates
   *     An array of location coordinates
   * @param precision Optional
   *     Number of decimals to format to
   *
   * @return { string }
   *     formatted location
   */
  transform(coordinates: any[], precision?: number): string {
    let latitude, longitude;

    try {
      longitude = parseFloat(coordinates[0]);
      latitude = parseFloat(coordinates[1]);
    } catch (e) {
      latitude = NaN;
      longitude = NaN;
    }

    return this.formatter.location(latitude, longitude, precision);
  }
}
