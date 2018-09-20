import { Pipe, PipeTransform } from '@angular/core';
import { Segment } from './segment';

@Pipe({
  name: 'createSegments'
})
export class CreateSegmentsPipe implements PipeTransform {
  /**
   * Creates segments array for result table
   *
   * @param product
   *    finite-fault product
   *
   * @return segments
   *    segment array
   */
  transform(product: any): Segment[] {
    if (!product || !product.properties) {
      return null;
    }

    let segments = [];
    const properties = product.properties;

    for (let i = 1; ; i++) {
      const segment = this._parseSegment(properties, i);

      if (!segment) {
        break;
      }

      segments.push(segment);
    }

    if (segments.length < 2) {
      segments = null;
    }

    return segments;
  }

  private _parseSegment(properties: any, id: number): Segment {
    const dipProp = `segment-${id}-dip`,
      strikeProp = `segment-${id}-strike`;

    if (
      properties.hasOwnProperty(dipProp) &&
      properties.hasOwnProperty(strikeProp)
    ) {
      return {
        dip: properties[dipProp],
        id: id,
        strike: properties[strikeProp]
      };
    } else {
      return null;
    }
  }
}
