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

import { BubbleSeriesComponent } from '@swimlane/ngx-charts';
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
export class ExtendedBubbleSeriesComponent extends BubbleSeriesComponent {

  @Input() curve: any = curveLinear;
  @Input() xDomain = [0, 0];

  getCircles(): any[] {
    const seriesName = this.data.name;

    return this.data.series.map((d, i) => {
      if (typeof d.y !== 'undefined' && typeof d.x !== 'undefined') {
        const y = d.y;
        const x = d.x;
        const r = d.r;
  
        const radius = this.rScale(r || 1);
        const tooltipLabel = formatLabel(d.name);

        const cx = (this.xScaleType === 'linear') ? this.xScale(Number(x)) : this.xScale(x);
        const cy = (this.yScaleType === 'linear') ? this.yScale(Number(y)) : this.yScale(y);

        const color = (this.colors.scaleType === 'linear') ?
          this.colors.getColor(r) :
          this.colors.getColor(seriesName);

        const isActive = !this.activeEntries.length ? true : this.isActive({name: seriesName});
        const opacity = isActive ? 1 : 0.3;

        // error bar calculations
        const max = d.max;
        const min = d.min;
        const errorBarWidth = (this.xDomain[1] - this.xDomain[0]) * .0125

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
      }
    }).filter((circle) => circle !== undefined);
  }
}
