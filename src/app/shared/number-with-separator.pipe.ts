import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sharedNumberWithSeparator'
})
export class NumberWithSeparatorPipe implements PipeTransform {

  transform(value: Number, locale?: any): any {
    if (typeof value === 'undefined' || value === null) {
      return '';
    }

    return value.toLocaleString(locale);
  }

}
