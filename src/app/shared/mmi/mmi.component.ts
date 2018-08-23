import { ChangeDetectionStrategy, Component, Input } from '@angular/core';


/**
 * Mmi Component for all magnitudes across pages
 *
 * @param bubble
 *     Whether or not to display the mmi bubble
 * @param intensity
 *     The magnitude/intensity
 * @param value
 *     The magnitude value
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'shared-mmi',
  styleUrls: ['./mmi.component.scss'],
  templateUrl: './mmi.component.html'
})
export class MmiComponent {
  @Input()
  bubble = false;

  @Input()
  intensity;

  @Input()
  value;
}
