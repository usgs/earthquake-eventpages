import { Component, Input } from '@angular/core';


/**
 * Summary link component
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
