import { NgModule } from '@angular/core';
import { ChartCommonModule } from '@swimlane/ngx-charts';
import { BubbleChartComponent } from './bubble-chart/bubble-chart.component';
import { BubbleSeriesComponent } from './bubble-series/bubble-series.component';
import { LineChartModule } from '../line-chart/line-chart.module';

export { BubbleChartComponent, BubbleSeriesComponent };

@NgModule({
  imports: [
    ChartCommonModule,
    LineChartModule
  ],
  declarations: [
    BubbleChartComponent,
    BubbleSeriesComponent
  ],
  exports: [
    BubbleChartComponent,
    BubbleSeriesComponent
  ]
})
export class BubbleChartModule {}
