import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'roundUp'
})
export class RoundUpPipe implements PipeTransform {

  transform(value: number, significant: number): any {
    let d,
        magnitude,
        power,
        shifted;

    if (value === 0) {
      return 0;
    }

    d = Math.ceil(Math.log10(value < 0 ? -value : value));
    power = significant - Math.ceil(d);

    magnitude = Math.pow(10, power);
    shifted = Math.ceil(value * magnitude);

    return shifted / magnitude;
  }

}
