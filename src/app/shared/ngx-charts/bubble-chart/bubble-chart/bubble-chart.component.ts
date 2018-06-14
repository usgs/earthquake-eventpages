import {
  Component,
  Input,
  Output,
  EventEmitter,
  HostListener,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  ContentChild,
  TemplateRef
} from '@angular/core';
import {
  trigger,
  style,
  animate,
  transition
} from '@angular/animations';

import { BubbleChartComponent as SwimlaneBubbleChart } from '@swimlane/ngx-charts';

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
          opacity: 1,
        }),
        animate(500, style({
          opacity: 0
        }))
      ])
    ])
  ]
})
export class BubbleChartComponent extends SwimlaneBubbleChart {

  @Input() errorBarColor = '#000000';

  customColors = [
    {
      name: 'error',
      value: this.errorBarColor
    }
  ];
}
