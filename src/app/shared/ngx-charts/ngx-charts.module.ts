import { NgModule } from '@angular/core';

import '@swimlane/ngx-charts/release/polyfills';

import { BubbleChartModule } from './bubble-chart/bubble-chart.module';
import {
  BubbleLineChartModule } from './bubble-line-chart/bubble-line-chart.module';
import { LineChartModule } from './line-chart/line-chart.module';

@NgModule({
  exports: [
    BubbleChartModule,
    BubbleLineChartModule,
    LineChartModule
  ]
})
export class NgxChartsModule {}
