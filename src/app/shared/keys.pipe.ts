import { Pipe, PipeTransform } from '@angular/core';


/**
 * Returns list of object keys, if exist on input object
 */
@Pipe({
  name: 'keys'
})
export class KeysPipe implements PipeTransform {


  transform (value: any, args?: any): any {
    if (!value) {
      return null;
    }
    return Object.keys(value);
  }

}
