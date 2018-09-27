import { Component, Input } from '@angular/core';

/**
 * Finite Fault popup dumb component to display popup data on each ff overlay
 * feature
 */
@Component({
  selector: 'finite-fault-map-popup',
  styleUrls: ['./finite-fault-map-popup.component.scss'],
  templateUrl: './finite-fault-map-popup.component.html'
})
export class FiniteFaultMapPopupComponent {
  @Input()
  color;
  @Input()
  moment;
  @Input()
  rake;
  @Input()
  rise;
  @Input()
  slip;
  @Input()
  trup;
}
