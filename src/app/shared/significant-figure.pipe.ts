import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sharedSignificantFigure'
})
export class SignificantFigurePipe implements PipeTransform {

  transform(value: any, figures: number): any {
    if (typeof value !== 'number') {
      value = parseFloat(value);
    }
    return parseFloat(value.toPrecision(figures));
  }
}
