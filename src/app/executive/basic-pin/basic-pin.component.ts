import { Component, Input, ViewEncapsulation } from '@angular/core';

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
  encapsulation: ViewEncapsulation.None,
  selector: 'basic-pin',
  styleUrls: ['./basic-pin.component.scss'],
  templateUrl: './basic-pin.component.html'
})
export class BasicPinComponent {
  @Input()
  footer;
  @Input()
  href;
  @Input()
  link;
  @Input()
  product;
  @Input()
  title;
}
