import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'shake-alert-confirmed',
  styleUrls: ['./shake-alert-confirmed.component.scss'],
  templateUrl: './shake-alert-confirmed.component.html'
})
export class ShakeAlertConfirmedComponent {
  @Input()
  cities: any;

  @Input()
  properties: any;

  @Input()
  summary: any;
}
