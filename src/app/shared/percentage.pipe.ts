import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sharedOafPercentage'
})
export class PercentagePipe implements PipeTransform {

  transform(value: any): any {
    if (typeof value !== 'number') {
      value = parseFloat(value);
    }

    if (value > 0.99) {
      value = '>99';
    } else if (value < 0.01) {
      value = '<1';
    } else {
      value = (value * 100).toFixed(0);
    }

    return value.toString() + '%';
  }
}
