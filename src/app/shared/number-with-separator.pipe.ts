import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sharedNumberWithSeparator'
})
export class NumberWithSeparatorPipe implements PipeTransform {
  /**
   * Returns shared number with separator
   *
   * @param value
   *     The number value
   * @param locale
   *     The language representation
   *
   * @returns {any}
   *     a formatted number
   */
  transform(value: number, locale?: any): any {
    let negative = '';

    if (typeof value === 'undefined' || value === null) {
      return '';
    }

    // Swap value around if negative
    if (value < 0) {
      negative = '-';
      value *= -1;
    }

    const meta = this._getLocaleInfo(locale);
    const parts = ('' + value).split('.');
    const wholePart = parts[0];
    const decimalPart = parts[1];

    if (typeof decimalPart === 'undefined') {
      // Input was an integer
      return (
        negative +
        value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, meta.separator)
      );
    } else {
      // Input was a decimal
      return (
        negative +
        wholePart.replace(/\B(?=(\d{3})+(?!\d))/g, meta.separator) +
        meta.decimal +
        decimalPart
      );
    }
  }

  /**
   * Get locale based separator and decimal information
   *
   * @param locale
   *     language representation
   *
   * @returns {{separator: string, decimal: string}}
   *     formatter object with separator and decimal information
   */
  private _getLocaleInfo(locale) {
    const knownValue = 1000.1;
    const localeValue = knownValue.toLocaleString(locale);

    return {
      decimal: localeValue.substr(5, 1),
      separator: localeValue.substr(1, 1)
    };
  }
}
