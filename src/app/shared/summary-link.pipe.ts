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
  transform (productType: any, event: any): any {
    if (!event || !productType) {
      return null;
    }

    const EXECUTIVE = {
      url: '/executive',
      text: 'Overview'
    };

    const IMPACT = {
      url: '/impact',
      text: 'Impact'
    };

    const TECHNICAL = {
      url: '/technical',
      text: 'Technical'
    };

    const TYPES = {
      'map': EXECUTIVE,
      'regioninfo': EXECUTIVE,

      'dyfi': IMPACT,
      'ground-failure': IMPACT,
      'losspager': IMPACT,
      'shakemap': IMPACT,
      'tellus': IMPACT,

      'moment-tensor': TECHNICAL,
      'oaf': TECHNICAL,
      'origin': TECHNICAL,
      'finite-fault': TECHNICAL,
      'focal-mechanism': TECHNICAL,
      'waveforms': TECHNICAL
    };

    const info = TYPES[productType];

    let count,
        text;

    try {
      count = event.properties.products[productType].length;
    } catch (e) {
      count = 0;
    }

    text = `Back to ${info.text}`;

    if (count > 1) {
      text = 'View alternative ' + productType.replace('-', ' ') +
          's (' + count + ' total)';
    }

    return {
      url: `${info.url}`,
      text: text
    };
  }

}
