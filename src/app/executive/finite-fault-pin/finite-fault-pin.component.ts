import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

/**
 * Finite Fault Pin
 *
 * @param product
 *     finite-fault product
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'executive-finite-fault-pin',
  styleUrls: ['./finite-fault-pin.component.scss'],
  templateUrl: './finite-fault-pin.component.html'
})
export class FiniteFaultPinComponent {
  link = '../finite-fault';
  @Input()
  product: any;
  title = 'Finite Fault';
}
