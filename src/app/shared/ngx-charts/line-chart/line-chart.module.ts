import { NgModule } from '@angular/core';
import { ChartCommonModule } from '@swimlane/ngx-charts';
import { ExtendedLineComponent } from './line/line.component';
import { ExtendedLineSeriesComponent } from './line-series/line-series.component';

export { ExtendedLineComponent, ExtendedLineSeriesComponent };

@NgModule({
  imports: [ChartCommonModule],
  declarations: [
    ExtendedLineComponent,
    ExtendedLineSeriesComponent
  ],
  exports: [
    ExtendedLineComponent,
    ExtendedLineSeriesComponent
  ]
})
export class LineChartModule {}
