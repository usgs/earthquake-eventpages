import { Pipe, PipeTransform } from '@angular/core';

import { FormatterService } from '../core/formatter.service';
import { DegreesPipe } from './degrees.pipe';

@Pipe({
  name: 'sharedUnits'
})
export class UnitsPipe implements PipeTransform {

  constructor(
      private formatterService: FormatterService
  ) { }

  /**
   * Present units correctly
   *
   * @param value {Number}
   *     Number to format.
   * @param units {String} Units to describe the number.
   *
   * @return {String}
   */
  transform(
      value: any,
      units: string): any {

    let output: string = null;

    switch (units) {
        case 'count': {
            output = value.toString();
            break;
        }

        case 'degrees': {
            const degPipe = new DegreesPipe(this.formatterService);
            output = degPipe.transform(value);
            break;
        }

        case 'lat': {
            output = this.formatterService.latitude(value);
            break;
        }

        case 'lon': {
            output = this.formatterService.longitude(value);
            break;
        }

        case 'intensity': {
            output = `${value} mmi`;
            break;
        }

        default: {
            output = `${value} ${units}`;
        }
    }

    return output;

  }

}
