import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'sharedOrderBy'
})
export class OrderByPipe implements PipeTransform {

  /**
   * Orders an array of data by some key
   *
   * @param data
   *     The array to organize
   *
   * @param key
   *     Array used to descend into the given object
   * 
   * @param desc (optional)
   *     Boolean, set to true to sort in descending order
   *
   * @return {any[]}
   *     Data array sorted by the appropriate key
   */
  transform (data: any, keys: any[], desc=false): Array<any> {
    data.sort((n1, n2) => {
      for (let key of keys) {
        n1 = n1[key];
        n2 = n2[key];
      }

      if (!n1) {
        return 1
      } else if (!n2) {
        return -1
      }

      if (!desc) {
        if (n1 > n2) {
          return 1
        } else if (n1 < n2) {
          return -1
        }
      } else {
        if (n1 < n2) {
          return 1
        } else if (n1 > n2) {
          return -1
        }
      }

      return 0
    });

    return data;
  }
}
