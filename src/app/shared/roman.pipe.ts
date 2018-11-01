import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sharedRoman'
})
export class RomanPipe implements PipeTransform {
  static MMI_ROMAN = [
    'I',
    'I',
    'II',
    'III',
    'IV',
    'V',
    'VI',
    'VII',
    'VIII',
    'IX',
    'X',
    'XI',
    'XII'
  ];

  /**
   * Get roman numeral from a number
   *
   * @param mmi
   *     The magnitude
   *
   * @return {any}
   *     A roman numeral
   */
  transform(mmi: any, noMmi = 'N/A'): string {
    let value;

    mmi = Math.round(parseFloat(mmi));
    value = RomanPipe.MMI_ROMAN[mmi];

    if (value) {
      return value;
    }

    return noMmi;
  }
}
