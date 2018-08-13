import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ChartCommonModule } from '@swimlane/ngx-charts';

import { BubbleChartModule } from '../bubble-chart/bubble-chart.module';
import { LineChartModule } from '../line-chart/line-chart.module';
import { BubbleLineChartComponent } from './bubble-line-chart/bubble-line-chart.component';

@NgModule({
  imports: [
    CommonModule,
    ChartCommonModule,
    LineChartModule,
    BubbleChartModule
  ],
  declarations: [BubbleLineChartComponent],
  exports: [BubbleLineChartComponent]
})
export class BubbleLineChartModule {}
