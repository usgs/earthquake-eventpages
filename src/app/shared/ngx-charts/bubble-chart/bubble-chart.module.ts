import { NgModule } from '@angular/core';

import { ChartCommonModule } from '@swimlane/ngx-charts';

import { LineChartModule } from '../line-chart/line-chart.module';
import { BubbleChartComponent } from './bubble-chart/bubble-chart.component';
import { BubbleSeriesComponent } from './bubble-series/bubble-series.component';

export { BubbleChartComponent, BubbleSeriesComponent };

@NgModule({
  declarations: [BubbleChartComponent, BubbleSeriesComponent],
  exports: [BubbleChartComponent, BubbleSeriesComponent],
  imports: [ChartCommonModule, LineChartModule]
})
export class BubbleChartModule {}
