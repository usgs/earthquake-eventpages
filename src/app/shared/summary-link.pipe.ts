import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sharedSummaryLink'
})
export class SummaryLinkPipe implements PipeTransform {

  transform(productType: any, event: any): any {
    if (!event || !productType) {
      return null;
    }

    const EXECUTIVE = {
      url: '/executive',
      text: 'Executive'
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
      'shakemap': IMPACT,
      'losspager': IMPACT,
      'tellus': IMPACT,

      'origin': TECHNICAL,
      'moment-tensor': TECHNICAL,
      'focal-mechanism': TECHNICAL,
      'finite-fault': TECHNICAL,
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
