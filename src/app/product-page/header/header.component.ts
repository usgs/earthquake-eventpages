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
    try {
      return this.product.id === this.event.properties.products[this.product.type][0].id;
    } catch (e) {
      return false;
    }
  }

  isReviewed(): boolean {
    try {
      return 'reviewed' === this.product.properties['review-status'].toLowerCase();
    } catch (e) {
      return false;
    }
  }

}
