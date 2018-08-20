import { Component, Input } from '@angular/core';

/**
 * DYFI Response Pin
 *
 * @param product
 *     dyfi product
 */
@Component({
  selector: 'executive-dyfi-response-submit-pin',
  styleUrls: ['./dyfi-response-submit-pin.component.scss'],
  templateUrl: './dyfi-response-submit-pin.component.html'
})
export class DyfiResponseSubmitPinComponent {
  footer = 'Citizen Scientist Contributions';
  link = '../tellus';
  @Input()
  product: any;
  title = 'Felt Report - Tell Us!';
}
