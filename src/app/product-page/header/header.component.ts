import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'product-page-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input() contributors: any;
  @Input() event: any;
  @Input() product: any;
  @Input() productType: any;

  constructor() { }

  ngOnInit() {
  }

  isPreferred(event: any, product: any): boolean {
    try {
      return product.id === event.properties.products[product.type][0].id;
    } catch (e) {
      return false;
    }
  }

  isReviewed(product: any): boolean {
    try {
      return 'reviewed' === product.properties['review-status'].toLowerCase();
    } catch (e) {
      return false;
    }
  }

}
