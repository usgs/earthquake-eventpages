import { NgModule } from '@angular/core';
import { ChartCommonModule } from '@swimlane/ngx-charts';
import { ExtendedBubbleChartComponent } from './bubble-chart/bubble-chart.component';
import { ExtendedBubbleSeriesComponent } from './bubble-series/bubble-series.component';
import { LineChartModule } from '../line-chart/line-chart.module';

export { ExtendedBubbleChartComponent, ExtendedBubbleSeriesComponent };

@NgModule({
  imports: [
    ChartCommonModule,
    LineChartModule
  ],
  declarations: [
    ExtendedBubbleChartComponent,
    ExtendedBubbleSeriesComponent
  ],
  exports: [
    ExtendedBubbleChartComponent,
    ExtendedBubbleSeriesComponent
  ]
})
export class BubbleChartModule {}
