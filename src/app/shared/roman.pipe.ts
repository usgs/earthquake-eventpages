import { Pipe, PipeTransform } from '@angular/core';


/**
 * Returns roman numeral corresponding to input number
 */
@Pipe({
  name: 'sharedRoman'
})
export class RomanPipe implements PipeTransform {


  static MMI_ROMAN = ['I', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII',
        'IX', 'X', 'XI', 'XII'];


  transform (mmi: number): any {
    let value;

    mmi = Math.round(mmi);
    value = RomanPipe.MMI_ROMAN[mmi];

    if (value) {
      return value;
    }

    return null;
  }

}
