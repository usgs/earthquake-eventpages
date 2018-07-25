import { Component, Input } from '@angular/core';


/**
 * Header generates markup for a product specific page and lists the
 * product's preferredness and its review status.
 *
 * @param contributors {any}
 *    product contributors
 *
 * @param event {any}
 *    event that product came from
 *
 * @param product {any}
 *    product to display
 */
@Component({
  selector: 'product-page-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  @Input() contributors: any;
  @Input() event: any;
  @Input() product: any;


  /**
   * Determine whether or not the product is preferred
   *
   * @param event {any}
   *    Event with all products
   *
   * @param product {any}
   *    product to check for preferredness
   */
  isPreferred(event: any, product: any): boolean {
    try {
      return product.id === event.properties.products[product.type][0].id;
    } catch (e) {
      return false;
    }
  }

  /**
   * Determine if the product has been reveiewd by scientists
   *
   * @param product
   *    product to check for reviewed status
   */
  isReviewed(product: any): boolean {
    try {
      return 'reviewed' === product.properties['review-status'].toLowerCase();
    } catch (e) {
      return false;
    }
  }
}
