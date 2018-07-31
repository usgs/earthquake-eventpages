import { Pipe, PipeTransform } from '@angular/core';

import { FormatterService } from '../core/formatter.service';
import { DegreesPipe } from './degrees.pipe';


@Pipe({
  name: 'sharedUnits'
})
export class UnitsPipe implements PipeTransform {


  constructor (public formatterService: FormatterService) { }


  /**
   * Present units correctly
   * @param value
   *     Number to format.
   * @param units
   *     Units to describe the number.
   *
   * @return { String | null }
   */
  transform (
    value: number | string,
    units: string): string | null {

    let output: string = null;

    if (value === null) {
      return null;
    }

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

        case 'latitude': {
            output = this.formatterService.latitude(+value);
            break;
        }

        case 'longitude': {
            output = this.formatterService.longitude(+value);
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
