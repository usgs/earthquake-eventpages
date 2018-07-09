import {
  Component,
  Input,
  ChangeDetectionStrategy
} from '@angular/core';
import {
  trigger,
  style,
  animate,
  transition
} from '@angular/animations';

import { BubbleSeriesComponent as SwimlaneBubbleSeries } from '@swimlane/ngx-charts';
import { formatLabel } from '@swimlane/ngx-charts';

import { curveLinear } from 'd3-shape';

@Component({
  selector: 'g[ngx-charts-bubble-series]',
  templateUrl: './bubble-series.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('animationState', [
      transition(':enter', [
        style({
          opacity: 0,
          transform: 'scale(0)'
        }),
        animate(250, style({opacity: 1, transform: 'scale(1)'}))
      ])
    ])
  ]
})
export class BubbleSeriesComponent extends SwimlaneBubbleSeries {

  @Input() curve: any = curveLinear;
  @Input() xDomain = [0, 0];

  getCircles(): any[] {
    const seriesName = this.data.name;

    const isActive = this.activeEntries && !this.activeEntries.length ? true : (this.isActive({name: seriesName}));

    return this.data.series.map((d, i) => {
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

      const color = (this.colors.scaleType === 'linear') ?
          this.colors.getColor(r) :
          this.colors.getColor(seriesName);

      const opacity = isActive ? 1 : 0.3;

      // error bar calculations
      const max = d.max;
      const min = d.min;

      // Should be replaced to allow origin plot to use a log scale
      const errorBarWidth = (this.xDomain[1] - this.xDomain[0]) * .0125;

      const data = {
        series: seriesName,
        name: d.name,
        value: d.y,
        x: d.x,
        radius: d.r
      };

      return {
        data,
        x,
        y,
        max,
        min,
        errorBarWidth,
        r,
        borderColor,
        classNames: [`circle-data-${i}`],
        value: y,
        label: x,
        cx,
        cy,
        radius,
        tooltipLabel,
        color,
        opacity,
        seriesName,
        isActive,
        transform: `translate(${cx},${cy})`
      };
    }).filter((circle) => circle !== null);
  }

  getErrorPathUpper(circle) {
    const path = `M${this.xScale(circle.x) - 10},${this.yScale(circle.max)}L${this.xScale(circle.x) + 10},${this.yScale(circle.max)}`;

    return path;
  }

  getErrorPathLower(circle) {
    const path = `M${this.xScale(circle.x) - 10},${this.yScale(circle.min)}L${this.xScale(circle.x) + 10},${this.yScale(circle.min)}`;

    return path;
  }
}
