import {
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
} from '@angular/core';
import {
  trigger,
  style,
  animate,
  transition
} from '@angular/animations';
import { LineChartComponent as SwimlaneLineChart } from '@swimlane/ngx-charts';

@Component({
  selector: 'ngx-charts-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['../../common/base-chart.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
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
export class LineChartComponent extends SwimlaneLineChart {

}
