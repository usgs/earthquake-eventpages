import { Pipe, PipeTransform } from '@angular/core';
import { FeltReport } from './felt-report';
import { FormatterService } from '@core/formatter.service';
import { Location } from '@shared/geo.service';

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

  transform(location: Location, feltReport: FeltReport): string {
    if (feltReport) {
      setTimeout(_ => (feltReport.location = location));
    }

    return location ? location.address : '';
  }
}
