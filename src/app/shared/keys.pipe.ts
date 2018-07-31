import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'keys'
})
export class KeysPipe implements PipeTransform {


  /**
   * Returns list of object keys, if exist on input object
   * @param value
   *     The object to get keys from
   * @param args, Optional
   *     Arguments array
   * @returns {any}
   */
  transform (value: any, args?: any): any {
    if (!value) {
      return null;
    }
    return Object.keys(value);
  }

}
