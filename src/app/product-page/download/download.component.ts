import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { ContentsXmlService } from '@core/contents-xml.service';

/**
 * Generates expansion panel to list all downloadable product contents
 *
 * @param product {Product}
 *    The product to download
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'product-page-download',
  styleUrls: ['./download.component.scss'],
  templateUrl: './download.component.html'
})
export class DownloadComponent {
  // see getter/setter below
  _product: any;

  @Input()
  expanded: any;

  constructor(public contentsXmlService: ContentsXmlService) {}

  /**
   * Gets contents xml from product
   */
  loadContentsXml() {
    let product = this._product;
    if (product && product.phasedata) {
      // prefer phase data when availble
      product = product.phasedata;
    }
    this.contentsXmlService.get(product);
  }

  /**
   * setter for product.
   */
  get product(): any {
    return this._product;
  }

  /**
   * Checks for changes to data by index
   *
   * @param index
   *    index of array
   * @param item
   *    content item
   */
  trackByIndex(index, item) {
    return index;
  }

  /**
   * getter for product,
   * fetch contents.xml if the expansion panel is open
   */
  @Input()
  set product(product: any) {
    this._product = product;
    if (this.expanded) {
      this.loadContentsXml();
    }
  }
}
