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

  static NO_MMI = 'N/A';

  /**
   * Get roman numeral from a number
   *
   * @param mmi
   *     The magnitude
   *
   * @return {any}
   *     A roman numeral
   */
  transform(mmi: any): string {
    let value;

    mmi = Math.round(parseFloat(mmi));
    value = RomanPipe.MMI_ROMAN[mmi];

    if (value) {
      return value;
    }

    return RomanPipe.NO_MMI;
  }
}
