import { Component, Input } from '@angular/core';

/**
 * Displays custom product page footer and product downloads
 *
 * @param product {Product}
 *    The product contents to display
 */
@Component({
  selector: 'product-page-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  @Input() product: any;
}
