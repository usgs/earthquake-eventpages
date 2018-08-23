import { ChangeDetectionStrategy, Component, Input } from '@angular/core';


/**
 * The main component for showing product attribution
 *
 * @param product
 *     The current product
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'shared-product-attribution',
  styleUrls: ['./product-attribution.component.scss'],
  templateUrl: './product-attribution.component.html'
})
export class ProductAttributionComponent {
  @Input()
  product: any;

  /**
   * Returns sources from product input
   * @param product
   *    The current product
   * @returns {Array<string>}
   *    The set of sources from product properties
   */
  getSources(product: any): Array<string> {
    const sources = new Set<string>();

    if (!product) {
      return [];
    }

    if (product.source) {
      sources.add(product.source.toLowerCase());
    }

    if (product.properties) {
      ['origin-source', 'magnitude-source', 'beachball-source'].forEach(
        prop => {
          if (product.properties[prop]) {
            sources.add(product.properties[prop].toLowerCase());
          }
        }
      );
    }

    return Array.from(sources);
  }
}
