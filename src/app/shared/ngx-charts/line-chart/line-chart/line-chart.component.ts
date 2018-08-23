import { trigger, style, animate, transition } from '@angular/animations';
import { Component, ViewEncapsulation } from '@angular/core';

import { LineChartComponent as SwimlaneLineChart } from '@swimlane/ngx-charts';

/**
 * Line chart component for use in maps
 */
@Component({
  animations: [
    trigger('animationState', [
      transition(':leave', [
        style({
          opacity: 1
        }),
        animate(
          500,
          style({
            opacity: 0
          })
        )
      ])
    ])
  ],
  encapsulation: ViewEncapsulation.None,
  selector: 'ngx-charts-line-chart',
  styleUrls: ['../../common/base-chart.component.scss'],
  templateUrl: './line-chart.component.html'
})
export class LineChartComponent extends SwimlaneLineChart {}
