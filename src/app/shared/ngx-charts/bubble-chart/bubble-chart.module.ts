import { NgModule } from '@angular/core';

import { ChartCommonModule as NgxChartCommonModule } from '@swimlane/ngx-charts';

import { LineChartModule } from '../line-chart/line-chart.module';
import { BubbleChartComponent } from './bubble-chart/bubble-chart.component';
import { BubbleSeriesComponent } from './bubble-series/bubble-series.component';
import { ChartCommonModule } from '../common/chart-common.module';

@NgModule({
  declarations: [BubbleChartComponent, BubbleSeriesComponent],
  exports: [BubbleChartComponent, BubbleSeriesComponent],
  imports: [NgxChartCommonModule, LineChartModule, ChartCommonModule]
})
export class BubbleChartModule {}
