import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sharedShakingImpact'
})
export class ShakingImpactPipe implements PipeTransform {
  defaultImpact = {shaking: 'Not felt', damage: 'None'};
  mmiImpacts = {
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

  /**
   * Generate shaking and damage qualitative strings from input mmi. Convert
   * mmi values null, '-', and '--' to mmi 0
   *
   * @param mmi
   *     Shaking mmi
   *
   * @return { String | null }
   */
  transform (
    mmi: any
  ): string | null {
    let impact;
    try {
      impact = this.mmiImpacts[Math.round(parseFloat(mmi))];
    }
    catch {
      impact = this.defaultImpact;
    }

    return impact || this.defaultImpact;
  }
}
