import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'product-page-summary-link',
  templateUrl: './summary-link.component.html',
  styleUrls: ['./summary-link.component.scss']
})
export class SummaryLinkComponent implements OnInit {

  @Input() event: any;
  @Input() product: any;

  constructor() { }

  ngOnInit() {
  }

  linkText(event: any, product: any, link: any): any {
    if ( event && product ) {
      const productLen = event.properties.products[product.type].length;
      if (productLen > 1) {
        return 'View alternative ' + product.type +
            ' (' + productLen + ' total)';
      }
    }
    return 'Back to ' + link;
  }
}

