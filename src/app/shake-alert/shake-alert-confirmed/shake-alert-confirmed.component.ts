import { Component, Input } from '@angular/core';

@Component({
  selector: 'shake-alert-confirmed',
  styleUrls: ['./shake-alert-confirmed.component.scss'],
  templateUrl: './shake-alert-confirmed.component.html'
})
export class ShakeAlertConfirmedComponent {
  @Input()
  alerts: any[];

  @Input()
  cities: any;

  @Input()
  id: string;

  @Input()
  time: string;

  @Input()
  title: string;
}
