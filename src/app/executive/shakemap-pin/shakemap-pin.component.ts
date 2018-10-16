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
  mmiDescription = {
    0: { shaking: 'Not felt', damage: 'None' },
    1: { shaking: 'Not felt', damage: 'None' },
    2: { shaking: 'Weak', damage: 'None' },
    3: { shaking: 'Weak', damage: 'None' },
    4: { shaking: 'Light', damage: 'None' },
    5: { shaking: 'Moderate', damage: 'Very light' },
    6: { shaking: 'Strong', damage: 'Light' },
    7: { shaking: 'Very strong', damage: 'Moderate' },
    8: { shaking: 'Severe', damage: 'Moderate/Heavy' },
    9: { shaking: 'Violent', damage: 'Heavy' },
    10: { shaking: 'Extreme', damage: 'Very Heavy' },
    11: { shaking: 'Extreme', damage: 'Very Heavy' },
    12: { shaking: 'Extreme', damage: 'Very Heavy' }
  };
  @Input()
  product: any;
  title = 'ShakeMap';

  /**
   * Return a shaking and damage description for the mmiDiscription loopup
   * returning 'Not Felt'/'None' for null, '-', or '--' mmis
   *
   * @param mmi
   *    shaking mmi value
   */
  getDescription (mmi: any) {
    if (mmi === null || mmi === '-' || mmi ==='--') {
      mmi = 0;
    }

    mmi = Math.round(mmi);
    if (this.mmiDescription[mmi]) {
      return this.mmiDescription[mmi];
    }

    return null;
  }
}
