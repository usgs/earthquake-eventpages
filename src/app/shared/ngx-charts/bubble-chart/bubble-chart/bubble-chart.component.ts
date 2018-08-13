import { trigger, style, animate, transition } from '@angular/animations';
import {
  Component,
  Input,
  ViewEncapsulation,
  ChangeDetectionStrategy
} from '@angular/core';

import { BubbleChartComponent as SwimlaneBubbleChart } from '@swimlane/ngx-charts';

/**
 * Bubble chart component to show the series items
 *
 * @param errorBarColor
 *     The color of the error bar on the component
 */
@Component({
  selector: 'ngx-charts-bubble-chart',
  templateUrl: './bubble-chart.component.html',
  styleUrls: ['../../common/base-chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
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
  ]
})
export class BubbleChartComponent extends SwimlaneBubbleChart {
  @Input()
  errorBarColor = '#000000';

  customColors = [
    {
      name: 'error',
      value: this.errorBarColor
    }
  ];
}
