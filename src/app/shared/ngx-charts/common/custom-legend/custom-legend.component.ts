import { Component, ViewEncapsulation } from '@angular/core';

import { LegendComponent as NgxLegendComponent } from '@swimlane/ngx-charts';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'ngx-charts-custom-legend',
  styleUrls: ['./custom-legend.component.scss'],
  templateUrl: './custom-legend.component.html'
})
export class CustomLegendComponent extends NgxLegendComponent {

}
