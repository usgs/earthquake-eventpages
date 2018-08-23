import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

/**
 * DYFI pin
 *
 * @param product
 *     dyfi product
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'executive-dyfi-pin',
  styleUrls: ['./dyfi-pin.component.scss'],
  templateUrl: './dyfi-pin.component.html'
})
export class DyfiPinComponent {
  link = '../dyfi';
  @Input()
  product: any;
  title = 'Did You Feel It?';
}
