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

  ngOnInit() {
  }

}
