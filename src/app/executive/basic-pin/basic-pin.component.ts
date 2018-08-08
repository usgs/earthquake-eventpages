import { Component, Input, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';

import { Event } from '../../event';

/**
 * Base pin class
 *
 * @param footer
 *     text for footer
 *
 * @param href
 *     overrides router link
 *
 * @param link
 *     router link for entire card action
 *
 * @param product
 *     product attribution, only used if footer is not provided
 *
 * @param title
 *     text for title
 */
@Component({
  selector: 'basic-pin',
  templateUrl: './basic-pin.component.html',
  styleUrls: ['./basic-pin.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BasicPinComponent {

  @Input() footer;
  @Input() href;
  @Input() link;
  @Input() product;
  @Input() title;

}
