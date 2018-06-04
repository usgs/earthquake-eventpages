import '@swimlane/ngx-charts/release/polyfills';

import { NgModule } from '@angular/core';
import { BubbleChartModule } from './bubble-chart/bubble-chart.module';
import { LineChartModule } from './line-chart/line-chart.module';

@NgModule({
  exports: [
    BubbleChartModule,
    LineChartModule
  ]
})
export class NgxChartsModule {}
