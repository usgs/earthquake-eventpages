import {
  Component,
  Input,
  ChangeDetectionStrategy
} from '@angular/core';
import {
  trigger,
  style,
  animate,
  transition
} from '@angular/animations';

import { LineComponent as SwimlaneLine } from '@swimlane/ngx-charts';

@Component({
  selector: 'g[ngx-charts-line]',
  templateUrl: './line.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('animationState', [
      transition(':enter', [
        style({
          strokeDasharray: 2000,
          strokeDashoffset: 2000,
        }),
        animate(1000, style({
          strokeDashoffset: 0
        }))
      ])
    ])
  ]
})
export class LineComponent extends SwimlaneLine {

  @Input() strokeWidth = '1.5px';

}
