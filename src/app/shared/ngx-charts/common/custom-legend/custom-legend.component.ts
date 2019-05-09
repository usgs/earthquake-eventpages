import { Component, Input, ViewEncapsulation } from '@angular/core';

import { LegendComponent } from '@swimlane/ngx-charts';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'ngx-charts-custom-legend',
  styleUrls: ['./custom-legend.component.scss'],
  templateUrl: './custom-legend.component.html'
})
export class CustomLegendComponent extends LegendComponent {
  @Input() icons = {};
}
