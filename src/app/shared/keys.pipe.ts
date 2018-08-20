import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'keys'
})
export class KeysPipe implements PipeTransform {
  /**
   * Returns list of object keys
   *
   * @param value
   *     The object to get keys from
   *
   * @return {any}
   *     object property names
   */
  transform(value: any): Array<any> {
    if (!value) {
      return null;
    }
    return Object.keys(value);
  }
}
