import { NgModule } from '@angular/core';

import { ChartCommonModule } from '@swimlane/ngx-charts';

import { LineComponent } from './line/line.component';
import { LineSeriesComponent } from './line-series/line-series.component';

export { LineComponent, LineSeriesComponent };

@NgModule({
  imports: [ChartCommonModule],
  declarations: [
    LineComponent,
    LineSeriesComponent
  ],
  exports: [
    LineComponent,
    LineSeriesComponent
  ]
})
export class LineChartModule {}
