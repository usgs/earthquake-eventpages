import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ChartCommonModule } from '@swimlane/ngx-charts';

import { BubbleLineChartComponent } from './bubble-line-chart/bubble-line-chart.component';
import { LineChartModule } from '../line-chart/line-chart.module';
import { BubbleChartModule } from '../bubble-chart/bubble-chart.module';
import { BubbleChartComponent } from './bubble-chart/bubble-chart.component';

@NgModule({
  imports: [
    CommonModule,
    ChartCommonModule,
    LineChartModule,
    BubbleChartModule
  ],
  declarations: [
    BubbleLineChartComponent,
    BubbleChartComponent
  ],
  exports: [
    BubbleLineChartComponent
  ]
})
export class BubbleLineChartModule { }
