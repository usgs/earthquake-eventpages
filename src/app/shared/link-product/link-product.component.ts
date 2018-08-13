import { Component, Input } from '@angular/core';

/**
 * Component used to share a product among elements
 *
 * @param product
 *     The product from this event
 */
@Component({
  selector: 'shared-link-product',
  templateUrl: './link-product.component.html',
  styleUrls: ['./link-product.component.scss']
})
export class LinkProductComponent {
  @Input()
  product: any;

  /**
   * Getter for the product text
   * @param product
   *     The product from this event
   * @returns {string}
   */
  getText(product: any): string {
    try {
      const text = product.properties.text;
      return text;
    } catch (e) {
      return 'no text';
    }
  }

  /**
   * Gets the product contents url, if exists
   * @param product
   * @returns {string}
   */
  getUrl(product: any): string {
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
