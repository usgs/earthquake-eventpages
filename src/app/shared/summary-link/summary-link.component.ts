import { Component, Input } from '@angular/core';


/**
 * Summary link component, returns a link to event/product summary via pipe
 * @param event
 *     The event object
 * @param productType
 *     The type of product from this event
 */
@Component({
  selector: 'shared-summary-link',
  templateUrl: './summary-link.component.html',
  styleUrls: ['./summary-link.component.scss']
})
export class SummaryLinkComponent {

  @Input() event: any;
  @Input() productType: any;

}
