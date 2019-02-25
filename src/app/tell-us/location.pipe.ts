import { Pipe, PipeTransform } from '@angular/core';
import { FeltReport } from './felt-report';
import { FormatterService } from '@core/formatter.service';
import { Location } from './location';

@Pipe({
  name: 'locationPipe'
})
export class LocationPipe implements PipeTransform {
  constructor(public formatter: FormatterService) {}

  getPrecision(accuracy: number): number {
    if (accuracy > 100000) {
      return 1;
    } else if (accuracy > 10000) {
      return 2;
    } else if (accuracy > 1000) {
      return 3;
    } else if (accuracy > 100) {
      return 4;
    } else {
      return 5;
    }
  }

  transform(position: Position, feltReport: FeltReport): string {
    if (!position) {
      return '';
    }

    const precision = this.getPrecision(+position.coords.accuracy);
    const latitude = +this.formatter.number(
      position.coords.latitude,
      precision
    );
    const longitude = +this.formatter.number(
      position.coords.longitude,
      precision
    );
    const address = this.formatter.location(latitude, longitude);

    if (feltReport) {
      setTimeout(_ => {
        feltReport.location = {
          address,
          latitude,
          longitude
        } as Location;
      });
    }

    return address;
  }
}
