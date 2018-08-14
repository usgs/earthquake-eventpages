import { Component, Input } from '@angular/core';

/**
 * Finite Fault Pin
 *
 * @param product
 *     finite-fault product
 */
@Component({
  selector: 'executive-finite-fault-pin',
  templateUrl: './finite-fault-pin.component.html',
  styleUrls: ['./finite-fault-pin.component.scss']
})
export class FiniteFaultPinComponent {
  link = '../finite-fault';
  title = 'Finite Fault';

  @Input()
  product: any;
}
