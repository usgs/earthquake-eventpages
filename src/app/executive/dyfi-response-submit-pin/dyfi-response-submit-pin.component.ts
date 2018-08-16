import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

/**
 * DYFI Response Pin
 *
 * @param product
 *     dyfi product
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
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

  /**
   * Checks for changes to data by index
   *
   * @param index
   *    index of array
   * @param item
   *    dyfi response
   */
  trackByResponse (index, item) {
    return index;
  }

}
