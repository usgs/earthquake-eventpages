import { Component, Input } from '@angular/core';


/**
 * DYFI Response Pin
 *
 * @param product
 *     dyfi product
 */
@Component({
  selector: 'executive-dyfi-response-submit-pin',
  templateUrl: './dyfi-response-submit-pin.component.html',
  styleUrls: ['./dyfi-response-submit-pin.component.scss']
})
export class DyfiResponseSubmitPinComponent {

  public link = '../tellus';
  public title = 'Felt Report - Tell Us!';
  public footer = 'Citizen Scientist Contributions';

  @Input() product: any;

}
