import { Component, Input } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError } from 'rxjs/operators/catchError';

@Component({
  selector: 'product-page-download',
  templateUrl: './download.component.html',
  styleUrls: ['./download.component.css']
})
export class DownloadComponent {

  private _product: any;

  private contents: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  public contents$: Observable<any> = this.contents.asObservable();

  constructor(
    public httpClient: HttpClient
  ) { }

  get product(): any {
    return this._product;
  }

  @Input() set product(product: any) {
    this._product = product;
    this.getContentsXML();
  }

  getContentsXML() {
    // fetch contents.xml
    const content = this.product.contents['contents.xml'];
    if (!content) {
      this.contents.next(false);
      return;
    }
    // TODO: fetch real contents xml
    this.contents.next(content.url);
  }

  jsonify(data: any): any {
    return JSON.stringify(data, null, 2);
  }
}
