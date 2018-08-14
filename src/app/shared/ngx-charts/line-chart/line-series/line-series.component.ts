import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

import { LineSeriesComponent as SwimlaneLineSeries } from '@swimlane/ngx-charts';

/**
 * LineSeriesComponent
 *
 * @param strokeWidth
 *    The string value of the width of stroke
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'g[ngx-charts-line-series]',
  templateUrl: './line-series.component.html'
})
export class LineSeriesComponent extends SwimlaneLineSeries {
  @Input()
  strokeWidth = '1.5px';

  /**
   * Helper function to sort by direction
   *
   * @param data
   *     The data to sort
   * @param [property='name']
   *     The data name
   * @param [direction='asc']
   *     The direction
   *
   * @return {number}
   */
  sortData(data, property = 'name', direction = 'asc') {
    return data.sort((a, b) => {
      if (direction === 'asc') {
        return a[property] - b[property];
      } else {
        return b[property] - a[property];
      }
    });
  }
}
