import { Pipe, PipeTransform } from '@angular/core';

import { FormatterService } from '../core/formatter.service';


/**
 * Returns a formatted location based on input coordinates
 */
@Pipe({
  name: 'sharedLocation'
})
export class LocationPipe implements PipeTransform {


  constructor (public formatter: FormatterService) { }


  transform (coordinates: any[], precision?: number): string {
    let latitude,
        longitude;

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
