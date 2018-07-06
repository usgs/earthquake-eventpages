import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'link'
})
export class LinkPipe implements PipeTransform {

  /**
   * Searches key properties for matching string and returns key if found
   * returns null if not found.
   * @param productType {string}
   *        product type to search for
   * @return key {string}
   *        returns matching key
   */
  transform(productType: any): any {
    const link = {
      'impact': ['dyfi', 'shakemap', 'losspager'],
      'technical': ['origin', 'moment-tensor']
    };

    const keys = Object.keys(link);

    for ( let i = 0, keysLen = keys.length; i < keysLen; i++ ) {
      for ( let k = 0, len = link[keys[i]].length; k < len; k++ ) {
        if ( productType === link[keys[i]][k] ) {
          return keys[i];
        }
      }
    }

    return null;
  }
}
