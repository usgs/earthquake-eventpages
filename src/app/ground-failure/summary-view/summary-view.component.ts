import { Component, Input } from '@angular/core';

@Component({
  selector: 'summary-view',
  styleUrls: ['./summary-view.component.scss'],
  templateUrl: './summary-view.component.html'
})
export class SummaryViewComponent {
  @Input()
  product: any;
}
