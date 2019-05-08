import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ChartCommonModule as NgxChartCommonModule } from '@swimlane/ngx-charts';
import { ChartCommonModule } from '../common/chart-common.module';
import { BubbleChartModule } from '../bubble-chart/bubble-chart.module';
import { LineChartModule } from '../line-chart/line-chart.module';
import { BubbleLineChartComponent } from './bubble-line-chart/bubble-line-chart.component';

@NgModule({
  declarations: [BubbleLineChartComponent],
  exports: [BubbleLineChartComponent],
  imports: [
    CommonModule,
    NgxChartCommonModule,
    ChartCommonModule,
    LineChartModule,
    BubbleChartModule
  ]
})
export class BubbleLineChartModule {}
