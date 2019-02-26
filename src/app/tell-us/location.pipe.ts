import { Pipe, PipeTransform } from '@angular/core';
import { FeltReport } from './felt-report';
import { Location } from '@shared/geo.service';

@Pipe({
  name: 'locationPipe'
})
export class LocationPipe implements PipeTransform {
  constructor() {}

  transform(location: Location, feltReport: FeltReport): string {
    if (feltReport) {
      setTimeout(_ => (feltReport.location = location));
    }

    return location ? location.address : '';
  }
}
