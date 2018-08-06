import { NgModule } from '@angular/core';

import { ChartCommonModule } from '@swimlane/ngx-charts';

import { LineComponent } from './line/line.component';
import { LineChartComponent } from './line-chart/line-chart.component';
import { LineSeriesComponent } from './line-series/line-series.component';

export { LineComponent, LineSeriesComponent, LineChartComponent };


@NgModule({
  imports: [
    ChartCommonModule
  ],
  declarations: [
    LineComponent,
    LineSeriesComponent,
    LineChartComponent
  ],
  exports: [
    LineComponent,
    LineSeriesComponent,
    LineChartComponent
  ]
})
export class LineChartModule {}
