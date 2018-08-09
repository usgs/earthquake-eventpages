import { Pipe, PipeTransform } from '@angular/core';

import { FormatterService } from '../core/formatter.service';


@Pipe({
  name: 'dyfiCounter'
})
export class DyfiCounterPipe implements PipeTransform {


  constructor (public formatterService: FormatterService) { }


  /**
   * Returns the dyfi counter values/numbers for displaying in pin
   * @param product
   *     Type of event product
   * @param padding
   *     Amount of padding
   * @returns {Array<string>}
   */
  transform (product: any, padding: number): Array<string> {
    let formatted,
        leadingZero;

    try {
      formatted = (
        product.properties['num-responses'] ||
        product.properties.numResp ||
        0).toString();
    } catch {
      formatted = '0';
    }

    formatted = this.formatterService.leftPad(formatted, padding, '0');
    leadingZero = true;

    return formatted.split('').map((value) => {
      leadingZero = (leadingZero && value === '0');
      return {
        'value': value,
        'leadingZero': leadingZero
      };
    });
  }

}



