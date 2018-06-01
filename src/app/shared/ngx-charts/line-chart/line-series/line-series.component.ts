import {
  Component,
  Input,
  ChangeDetectionStrategy
} from '@angular/core';

import { LineSeriesComponent } from '@swimlane/ngx-charts';

@Component({
  selector: 'g[ngx-charts-line-series]',
  templateUrl: './line-series.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExtendedLineSeriesComponent extends LineSeriesComponent {

  @Input() strokeWidth = '1.5px';

}
