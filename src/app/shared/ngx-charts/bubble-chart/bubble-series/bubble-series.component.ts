import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';

import {
  BubbleSeriesComponent as SwimlaneBubbleSeries,
  formatLabel
} from '@swimlane/ngx-charts';
import { curveLinear } from 'd3-shape';

/**
 * Bubble series component for ngx chart
 *
 * @param curve
 *     Linear curve of the bubble series
 * @param xDomain
 *     All x values of the domain
 */
@Component({
  animations: [
    trigger('animationState', [
      transition(':enter', [
        style({
          opacity: 0,
          transform: 'scale(0)'
        }),
        animate(250, style({ opacity: 1, transform: 'scale(1)' }))
      ])
    ])
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'g[ngx-charts-bubble-series]',
  templateUrl: './bubble-series.component.html'
})
export class BubbleSeriesComponent extends SwimlaneBubbleSeries {
  @Input()
  curve: any = curveLinear;
  @Input()
  xDomain = [0, 0];

  /**
   * Function to return calculated circle for bubble series
   */
  getCircles(): any[] {
    const seriesName = this.data.name;

    const isActive =
      this.activeEntries && !this.activeEntries.length
        ? true
        : this.isActive({ name: seriesName });

    return this.data.series
      .map((d, i) => {
        if (typeof d.y === 'undefined' || typeof d.x === 'undefined') {
          return null;
        }

        const y = d.y;
        const x = d.x;
        const r = d.r;

        const radius = this.rScale(r || 1);
        const borderColor = d.borderColor || null;

        const tooltipLabel = formatLabel(d.name);

        const cx = this.xScale(x);
        const cy = this.yScale(y);

        const color =
          this.colors.scaleType === 'linear'
            ? this.colors.getColor(r)
            : this.colors.getColor(seriesName);

        const opacity = isActive ? 1 : 0.3;

        // error bar calculations
        const max = d.max;
        const min = d.min;

        // Should be replaced to allow origin plot to use a log scale
        const errorBarWidth = (this.xDomain[1] - this.xDomain[0]) * 0.0125;

        const data = {
          radius: d.r,
          series: seriesName,
          value: d.y,
          ...d
        };

        return {
          borderColor,
          classNames: [`circle-data-${i}`],
          color,
          cx,
          cy,
          data,
          errorBarWidth,
          isActive,
          label: x,
          max,
          min,
          opacity,
          r,
          radius,
          seriesName,
          tooltipLabel,
          transform: `translate(${cx},${cy})`,
          value: y,
          x,
          y
        };
      })
      .filter(circle => circle !== null);
  }

  /**
   * Returns the lower path of the circle error
   * @param circle
   *     The circle to check for errors
   */
  getErrorPathLower(circle) {
    const path = `M${this.xScale(circle.x) - 10},${this.yScale(circle.min)}L
        ${this.xScale(circle.x) + 10},${this.yScale(circle.min)}`;

    return path;
  }

  /**
   * Returns the upper path of the circle error
   * @param circle
   *     The circle to check for errors
   * @returns {any}
   */
  getErrorPathUpper(circle) {
    const path = `M${this.xScale(circle.x) - 10},${this.yScale(circle.max)}L
        ${this.xScale(circle.x) + 10},${this.yScale(circle.max)}`;

    return path;
  }
}
