import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sharedRomanToNumber'
})
export class RomanToNumberPipe implements PipeTransform {
  transform(cdi: any): any {
    if (!cdi || typeof cdi !== 'string') {
      return null;
    }

    const romanMap = {
      I: 1,
      II: 2,
      III: 3,
      IV: 4,
      IX: 9,
      V: 5,
      VI: 6,
      VII: 7,
      VIII: 8,
      X: 10,
      XI: 11,
      XII: 12
    };

    let cdiNumberValue = null;

    Object.keys(romanMap).forEach(key => {
      if (cdi.toUpperCase() === key) {
        cdiNumberValue = romanMap[key];
      }
    });

    return cdiNumberValue;
  }
}
