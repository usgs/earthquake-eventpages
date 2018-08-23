import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { FormatterService } from '@core/formatter.service';


/**
 * Uncertain value component
 *
 * @param value
 *     The uncertain value
 * @param uncertainty
 *     The degree of uncertainty
 * @param uncertaintyUnits
 *     The unit value of the uncertainty
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'shared-uncertain-value',
  styleUrls: ['./uncertain-value.component.scss'],
  templateUrl: './uncertain-value.component.html'
})
export class UncertainValueComponent {
  @Input()
  uncertainty: number;
  @Input()
  uncertaintyUnits: string = null;
  @Input()
  value = '';

  constructor(public formatter: FormatterService) {}

  /**
   * Returns value of uncertainty property or zero
   *
   * @return {number | boolean}
   */
  hasUncertainty() {
    return this.uncertainty || this.uncertainty === 0;
  }
}
