import { Component, Input } from '@angular/core';

@Component({
  selector: 'shakemap-legend',
  styleUrls: ['./legend.component.scss'],
  templateUrl: './legend.component.html'
})
export class LegendComponent {
  @Input()
  legendType = null;
  @Input()
  product = null;
}
