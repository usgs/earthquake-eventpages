import {
  Component,
  Input,
  ChangeDetectionStrategy
} from '@angular/core';

import { LineSeriesComponent as SwimlaneLineSeries } from '@swimlane/ngx-charts';

@Component({
  selector: 'g[ngx-charts-line-series]',
  templateUrl: './line-series.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LineSeriesComponent extends SwimlaneLineSeries {

  @Input() strokeWidth = '1.5px';

}
