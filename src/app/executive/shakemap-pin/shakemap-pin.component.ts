import { ChangeDetectionStrategy, Component, Input } from '@angular/core';


/**
 * Shakemap Pin
 *
 * @param product
 *     shakemap product
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'executive-shakemap-pin',
  styleUrls: ['./shakemap-pin.component.scss'],
  templateUrl: './shakemap-pin.component.html'
})
export class ShakemapPinComponent {
  link = '../shakemap';
  @Input()
  product: any;
  title = 'ShakeMap';
}
