import { Component, Input } from '@angular/core';

import { LegendEntryComponent } from '@swimlane/ngx-charts';
import { shadeRGBColor } from '@swimlane/ngx-charts/release/utils';
import { Triangle } from '../shape/triangle';

@Component({
  selector: 'ngx-charts-custom-legend-entry',
  styleUrls: ['./custom-legend-entry.component.scss'],
  templateUrl: './custom-legend-entry.component.html'
})
export class CustomLegendEntryComponent extends LegendEntryComponent {
  _icon: any = {
    shape: null, size: null
  };
  boxSize = 12;

  @Input()
  set icon (icon) {
    if (icon.shape === 'triangle') {
      const tri = new Triangle(icon.size);
      icon.path = tri.path;
    }

    this._icon = icon;
  }

  get icon () {
    return this._icon;
  }

  triangleTransform (r) {
    const translate = (this.boxSize - r * 2) / 2;

    return `translate(${translate},${translate})`;
  }
}
