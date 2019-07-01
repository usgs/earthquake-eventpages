import {
  Component,
  Input
} from '@angular/core';

import { CircleComponent } from '@swimlane/ngx-charts';
import { Triangle } from './triangle';

@Component({
  selector: 'g[ngx-charts-shape]',
  styleUrls: ['./shape.component.scss'],
  templateUrl: './shape.component.html'
})
export class ShapeComponent extends CircleComponent {
  _shape = 'circle';
  path: string;
  transform: string;

  @Input()
  set shape (shape) {
    if (shape === 'triangle') {
      const tri = new Triangle(this.r);
      this.r = tri.radius;
      this.transform = tri.transform;
      this.path = tri.path;
    }

    this._shape = shape;
  }

  get shape () {
    return this._shape;
  }


}
