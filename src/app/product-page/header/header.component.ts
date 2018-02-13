import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'product-page-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Input() contributors: any;
  @Input() event: any;
  @Input() product: any;
  @Input() title: any;

  constructor() { }

  ngOnInit() {
  }

  isPreferred(): boolean {
    return this.product.id === this.event.properties.products[this.product.type][0].id;
  }

  isReviewed(): boolean {
    let reviewStatus;
    if (this.product.properties['review-status']) {
      reviewStatus = this.product.properties['review-status'].toLowerCase();
    }
    return reviewStatus === 'reviewed';
  }

}
