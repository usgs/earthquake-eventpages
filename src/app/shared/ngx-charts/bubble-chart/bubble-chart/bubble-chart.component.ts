import { trigger, style, animate, transition } from '@angular/animations';
import {
  Component,
  Input,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  NgZone,
  ElementRef
} from '@angular/core';

import { BubbleChartComponent as SwimlaneBubbleChart } from '@swimlane/ngx-charts';

/**
 * Bubble chart component to show the series items
 *
 * @param errorBarColor
 *     The color of the error bar on the component
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
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  selector: 'ngx-charts-bubble-chart',
  styleUrls: ['../../common/base-chart.component.scss'],
  templateUrl: './bubble-chart.component.html'
})
export class BubbleChartComponent extends SwimlaneBubbleChart {
  customColors;
  @Input()
  errorBarColor;

  constructor(chartElement: ElementRef, zone: NgZone, cd: ChangeDetectorRef) {
    super(chartElement, zone, cd);

    this.errorBarColor = '#000000';
    this.customColors = [
      {
        name: 'error',
        value: this.errorBarColor
      }
    ];
  }
}
