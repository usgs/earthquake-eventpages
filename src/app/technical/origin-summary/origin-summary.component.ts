import { Component, Input } from '@angular/core';

import { FormatterService } from '../../core/formatter.service';


/**
 * Technical origin component
 */
@Component({
  selector: 'technical-origin-summary',
  templateUrl: './origin-summary.component.html',
  styleUrls: ['./origin-summary.component.scss']
})
export class OriginSummaryComponent {

  // Table headers
  public columnsToDisplay = [
    'catalog',
    'magnitude',
    'time',
    'depth',
    'status',
    'location',
    'source'
  ];

  @Input() event: any;
  @Input() products: Array<any>;


  constructor (public formatterService: FormatterService) { }


  /**
   * Returns a date object from a string
   * @param {string} str
   * @returns {Date}
   */
  toDate (str: string) {
    return new Date(str);
  }

}
