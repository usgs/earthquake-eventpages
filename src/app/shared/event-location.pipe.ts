import { Pipe, PipeTransform } from '@angular/core';

import { FormatterService } from '../core/formatter.service';

@Pipe({
  name: 'sharedEventLocation'
})
export class EventLocationPipe implements PipeTransform {

  constructor (public formatter: FormatterService) { }

  transform(event: any, precision?: number): string {
    let coordinates,
        latitude,
        longitude;

    try {
      coordinates = event.geometry.coordinates;
      longitude = parseFloat(coordinates[0]);
      latitude = parseFloat(coordinates[1]);
    } catch (e) {
      latitude = NaN;
      longitude = NaN;
    }

    return this.formatter.location(latitude, longitude, precision);
  }
}
