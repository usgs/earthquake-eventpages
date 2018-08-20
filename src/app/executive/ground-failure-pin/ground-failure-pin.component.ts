import { Component, Input } from '@angular/core';

/**
 * Ground Failure Pin
 */
@Component({
  selector: 'executive-ground-failure-pin',
  styleUrls: ['./ground-failure-pin.component.scss'],
  templateUrl: './ground-failure-pin.component.html'
})
export class GroundFailurePinComponent {
  link = '../ground-failure';
  @Input()
  product: any;
  title = 'Ground Failure';
}
