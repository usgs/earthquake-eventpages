import { Component, Input } from '@angular/core';

import { FormatterService } from '../../core/formatter.service';


/**
 * Uncertain value component
 * @param value
 *     The uncertain value
 * @param uncertainty
 *     The degree of uncertainty
 * @param uncertaintyUnits
 *     The unit value of the uncertainty
 */
@Component({
  selector: 'shared-uncertain-value',
  templateUrl: './uncertain-value.component.html',
  styleUrls: ['./uncertain-value.component.scss']
})
export class UncertainValueComponent {


  @Input() value = '';
  @Input() uncertainty: number;
  @Input() uncertaintyUnits: string = null;


  constructor (public formatter: FormatterService) { }


  /**
   * Returns value of uncertainty property or zero
   * @returns {number | boolean}
   */
  hasUncertainty () {
    return (this.uncertainty || this.uncertainty === 0);
  }

}
