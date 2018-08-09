import { Component, Input } from '@angular/core';


/**
 * Creates a return link for a product to the overview/impact/technical
 *
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
