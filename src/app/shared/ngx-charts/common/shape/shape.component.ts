import {
  Component,
  Input,
  Output,
  EventEmitter
} from '@angular/core';

import { CircleComponent } from '@swimlane/ngx-charts';

@Component({
  selector: 'g[ngx-charts-shape]',
  templateUrl: './shape.component.html'
})
export class ShapeComponent extends CircleComponent {

  @Input() shape = 'circle';

  getTrianglePath (r) {
    return `0,${r}, ${r/2},0 ${r},${r}`;
  }

  getTriangleRadius (r) {
    return r * 3;
  }

  getTriangleTransform (r) {
    return `translate(${-r/2},${-r/2})`;
  }

}
