import { Pipe, PipeTransform } from '@angular/core';

import { FormatterService } from '@core/formatter.service';

@Pipe({
  name: 'eventLocation'
})
export class EventLocationPipe implements PipeTransform {
  constructor(public formatter: FormatterService) {}

  /**
   * Returns the exact location of the event
   *
   * @param event
   *     The event object
   * @param precision {optional}
   *     The decimal precision for lat/lon
   *
   * @return
   *     Formatted location
   */
  transform(event: any, precision?: number): string {
    let coordinates, latitude, longitude;

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
