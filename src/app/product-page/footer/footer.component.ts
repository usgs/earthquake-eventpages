import { ChangeDetectionStrategy, Component, Input } from '@angular/core';


/**
 * Displays custom product page footer and product downloads
 *
 * @param product {Product}
 *    The product contents to display
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'product-page-footer',
  styleUrls: ['./footer.component.scss'],
  templateUrl: './footer.component.html'
})
export class FooterComponent {
  @Input()
  product: any;
}
