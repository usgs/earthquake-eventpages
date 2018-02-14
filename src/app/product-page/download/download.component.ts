import { Component, Input } from '@angular/core';

import { ContentsXmlService } from '../../contents-xml.service';


@Component({
  selector: 'product-page-download',
  templateUrl: './download.component.html',
  styleUrls: ['./download.component.css']
})
export class DownloadComponent {

  private _product: any;
  private opened: boolean = false;

  constructor(
    public service: ContentsXmlService
  ) { }

  get product(): any {
    return this._product;
  }

  @Input() set product(product: any) {
    this._product = product;
    if (this.opened) {
      this.loadContentsXml();
    }
  }

  loadContentsXml () {
    this.service.get(this._product);
  }

  onClosed () {
    this.opened = false;
  }

  onOpen () {
    this.opened = true;
    this.loadContentsXml();
  }
}


