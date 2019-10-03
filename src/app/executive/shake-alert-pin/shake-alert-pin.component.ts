import { Component, Input } from '@angular/core';

/**
 * Presentational pin component for ShakeSAlert event
 */
@Component({
  selector: 'executive-shake-alert-pin',
  styleUrls: ['./shake-alert-pin.component.scss'],
  templateUrl: './shake-alert-pin.component.html'
})
export class ShakeAlertPinComponent {
  link = '../shake-alert';
  @Input() product;
  @Input() status;
  title = '';
}
