import {
  Component,
  Input,
  OnInit,
  ChangeDetectionStrategy
} from '@angular/core';

import { LineSeriesComponent as SwimlaneLineSeries } from '@swimlane/ngx-charts';

@Component({
  selector: 'g[ngx-charts-line-series]',
  templateUrl: './line-series.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LineSeriesComponent extends SwimlaneLineSeries implements OnInit {

  @Input() strokeWidth = '1.5px';

  ngOnInit () {
  }

  sortData(data, property = 'name', direction = 'asc') {
    return data.sort((a, b) => {
      if (direction === 'asc') {
        return a[property] - b[property];
      } else {
        return b[property] - a[property];
      }
    });
  }
}
