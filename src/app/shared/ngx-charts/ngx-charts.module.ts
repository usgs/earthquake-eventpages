import '@swimlane/ngx-charts/release/polyfills';

import { NgModule } from '@angular/core';
import { ChartCommonModule } from '@swimlane/ngx-charts';
import { AreaChartModule } from '@swimlane/ngx-charts';
import { BarChartModule } from '@swimlane/ngx-charts';
import { BubbleChartModule } from './bubble-chart/bubble-chart.module';
import { ForceDirectedGraphModule } from '@swimlane/ngx-charts';
import { HeatMapModule } from '@swimlane/ngx-charts';
import { LineChartModule } from './line-chart/line-chart.module';
import { PolarChartModule } from '@swimlane/ngx-charts';
import { NumberCardModule } from '@swimlane/ngx-charts';
import { PieChartModule } from '@swimlane/ngx-charts';
import { TreeMapModule } from '@swimlane/ngx-charts';
import { GaugeModule } from '@swimlane/ngx-charts';

@NgModule({
  exports: [
    ChartCommonModule,
    AreaChartModule,
    BarChartModule,
    BubbleChartModule,
    ForceDirectedGraphModule,
    HeatMapModule,
    LineChartModule,
    PolarChartModule,
    NumberCardModule,
    PieChartModule,
    TreeMapModule,
    GaugeModule
  ]
})
export class NgxChartsModule {}
