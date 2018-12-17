import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sharedSummaryLink'
})
export class SummaryLinkPipe implements PipeTransform {
  /**
   * Builds a link to the overview/technical/impact summary page, based
   * on the product type
   *
   * @param productType
   *     The type of product
   * @param event
   *     The event
   *
   * @return {any}
   *     link (url/text) object
   */
  transform(productType: any): any {
    if (!productType) {
      return null;
    }

    const IMPACT = {
      text: 'Impact',
      url: '/impact'
    };

    const TECHNICAL = {
      text: 'Technical',
      url: '/technical'
    };

    const TYPES = {
      dyfi: IMPACT,
      'finite-fault': TECHNICAL,
      'focal-mechanism': TECHNICAL,
      'ground-failure': IMPACT,
      losspager: IMPACT,
      'moment-tensor': TECHNICAL,
      oaf: TECHNICAL,
      origin: TECHNICAL,
      'shake-alert': TECHNICAL,
      shakemap: IMPACT,
      tellus: IMPACT,
      waveforms: TECHNICAL
    };

    const info = TYPES[productType];
    const text = `${info.text} Summary`;

    return {
      text: text,
      url: `${info.url}`
    };
  }
}
