import {
  Component,
  Input,
  ViewEncapsulation,
  ChangeDetectionStrategy
} from '@angular/core';
import {
  trigger,
  style,
  animate,
  transition
} from '@angular/animations';

import {
  calculateViewDimensions,
  ViewDimensions
} from '@swimlane/ngx-charts';

import { curveLinear } from 'd3-shape';

import { BubbleChartComponent } from '../../bubble-chart/bubble-chart/bubble-chart.component';

@Component({
  selector: 'ngx-charts-bubble-line-chart',
  templateUrl: './bubble-line-chart.component.html',
  styleUrls: ['../../common/base-chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  animations: [
    trigger('animationState', [
      transition(':leave', [
        style({
          opacity: 1,
        }),
        animate(500, style({
          opacity: 0
        }))
      ])
    ])
  ]
})
export class BubbleLineChartComponent extends BubbleChartComponent {

  @Input() curve: any = curveLinear;
  @Input() lineSeries: any = null;
  xSet: any;

  ngOnInit() {
  }

  update(): void {
    super.update();

    this.dims = calculateViewDimensions({
      width: this.width,
      height: this.height,
      margins: this.margin,
      showXAxis: this.xAxis,
      showYAxis: this.yAxis,
      xAxisHeight: this.xAxisHeight,
      yAxisWidth: this.yAxisWidth,
      showXLabel: this.showXAxisLabel,
      showYLabel: this.showYAxisLabel,
      showLegend: this.legend,
      legendType: this.schemeType,
    });
  }

  getXDomain(): any[] {
    let domain;
    let values = super.getXDomain()

    let min;
    let max;
    if (this.scaleType === 'time' || this.scaleType === 'linear') {
      min = this.xScaleMin
        ? this.xScaleMin
        : Math.min(...values);

      max = this.xScaleMax
        ? this.xScaleMax
        : Math.max(...values);
    }

    if (this.scaleType === 'time') {
      domain = [new Date(min), new Date(max)];
      this.xSet = [...values].sort((a, b) => {
        const aDate = a.getTime();
        const bDate = b.getTime();
        if (aDate > bDate) return 1;
        if (bDate > aDate) return -1;
        return 0;
      });
    } else if (this.scaleType === 'linear') {
      domain = [min, max];
      // Use compare function to sort numbers numerically
      this.xSet = [...values].sort((a, b) => (a - b));
    } else {
      domain = values;
      this.xSet = values;
    }

    return domain
  }

}
