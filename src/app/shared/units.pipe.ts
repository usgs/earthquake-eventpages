import { Pipe, PipeTransform } from '@angular/core';
import { FormatterService } from '../core/formatter.service';
import { DegreesPipe } from './degrees.pipe'
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

    if (units === 'count') {

        return value;

    } else if (units === 'degrees') {

        let degPipe = new DegreesPipe(this.formatterService);
        return degPipe.transform(value);

    } else if (units === 'intensity'){

        return `${value}  mmi`;

    } else {

        return `${value} ${units}`;
    }
  }
}
