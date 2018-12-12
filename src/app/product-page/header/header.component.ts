import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

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
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'product-page-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  @Input()
  contributors: any;
  @Input()
  event: any;
  @Input()
  product: any;
  @Input()
  showVersion: boolean;

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
