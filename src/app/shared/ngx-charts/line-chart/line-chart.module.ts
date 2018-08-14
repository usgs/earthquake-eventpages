import { NgModule } from '@angular/core';

import { ChartCommonModule } from '@swimlane/ngx-charts';

import { LineComponent } from './line/line.component';
import { LineChartComponent } from './line-chart/line-chart.component';
import { LineSeriesComponent } from './line-series/line-series.component';

export { LineComponent, LineSeriesComponent, LineChartComponent };

@NgModule({
  declarations: [LineComponent, LineSeriesComponent, LineChartComponent],
  exports: [LineComponent, LineSeriesComponent, LineChartComponent],
  imports: [ChartCommonModule]
})
export class LineChartModule {}
