import { Component, Input } from '@angular/core';

import { ContentsXmlService } from '../../core/contents-xml.service';

/**
 * Generates expansion panel to list all downloadable product contents
 *
 * @param product {Product}
 *    The product to download
 */
@Component({
  selector: 'product-page-download',
  templateUrl: './download.component.html',
  styleUrls: ['./download.component.scss']
})
export class DownloadComponent {

  // see getter/setter below
  public _product: any;

  public open = false;


  constructor (
    public contentsXmlService: ContentsXmlService
  ) { }

  /**
   * Check if downloads expansion panel is expanded
   */
  isOpen () {
    return this.open;
  }

  /**
   * Gets contents xml from product
   */
  loadContentsXml () {
    let product = this._product;
    if (product && product.phasedata) {
      // prefer phase data when availble
      product = product.phasedata;
    }
    this.contentsXmlService.get(product);
  }

  /**
   * Keeps track of expansion panel state
   */
  onClose () {
    this.open = false;
  }

  /**
   * Keeps track of expansion panel state, triggers fetch
   */
  onOpen () {
    this.open = true;
    this.loadContentsXml();
  }

  /**
   * setter for product.
   */
  get product(): any {
    return this._product;
  }

  /**
   * getter for product,
   * fetch contents.xml if the expansion panel is open
   */
  @Input() set product(product: any) {
    this._product = product;
    if (this.open) {
      this.loadContentsXml();
    }
  }
}


