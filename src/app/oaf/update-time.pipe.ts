import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'updateTime'
})
export class UpdateTimePipe implements PipeTransform {
  /**
   * Adds time to creationTime stamp.
   * @param creationTime {number}
   *    Time Stamp
   * @param advisoryTime {string}
   *    Time as a string 1 Day, 1 Week, 1 Month, 1 Year
   *
   * @return {number}
   *    Time stamp
   */
  transform(creationTime: number, advisoryTime: string): any {
    if (advisoryTime === '1 Day') {
      return creationTime + 24 * 3600 * 1000;
    } else if (advisoryTime === '1 Week') {
      return creationTime + 7 * 24 * 3600 * 1000;
    } else if (advisoryTime === '1 Month') {
      return creationTime + 30 * 24 * 3600 * 1000;
    } else if (advisoryTime === '1 Year') {
      return creationTime + 365 * 24 * 3600 * 1000;
    } else {
      return null;
    }
  }
}
