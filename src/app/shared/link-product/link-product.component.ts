import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'shared-link-product',
  templateUrl: './link-product.component.html',
  styleUrls: ['./link-product.component.css']
})
export class LinkProductComponent implements OnInit {

  @Input() product: any;

  constructor() { }

  ngOnInit() {
  }

  getText (product: any): string {
    try {
      const text = product.properties.text;
      return text;
    } catch (e) {
      return 'no text';
    }
  }

  getUrl (product: any): string {
    try {
      const url = product.properties.url;

      // relative link to attached content
      if (product.contents[url]) {
        return product.contents[url].url;
      }

      return url;
    } catch (e) {
      return '#nourl';
    }
  }

}
