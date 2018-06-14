import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sharedSignificantFigure'
})
export class SignificantFigurePipe implements PipeTransform {

  transform(value: any, significant: number): any {
    let d,
        magnitude,
        power,
        shifted;

    if (value === 0) {
      return 0;
    }

    d = Math.ceil(Math.log10(value < 0 ? -value : value));
    power = significant - (d);

    magnitude = Math.pow(10, power);
    shifted = Math.round(value * magnitude);

    return shifted / magnitude;
  }
}
