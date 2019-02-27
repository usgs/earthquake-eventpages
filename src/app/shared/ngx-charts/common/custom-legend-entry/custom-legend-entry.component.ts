import { Component, Input } from '@angular/core';

import { LegendEntryComponent } from '@swimlane/ngx-charts';
import { shadeRGBColor } from '@swimlane/ngx-charts/release/utils';

@Component({
  selector: 'ngx-charts-custom-legend-entry',
  styleUrls: ['./custom-legend-entry.component.scss'],
  templateUrl: './custom-legend-entry.component.html'
})
export class CustomLegendEntryComponent extends LegendEntryComponent {
  @Input() shape = 'triangle';
}
