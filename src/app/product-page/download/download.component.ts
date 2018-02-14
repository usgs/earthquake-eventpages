import { Component, Input } from '@angular/core';

import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';

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
  }

  getContent (name: string): Object {
    return this._product.contents[name] || {};
  }

  loadContentsXml () {
    const content = this.product.contents['contents.xml'];
    const options = {responseType: 'text' as 'text'};

    return this.httpClient.get(content.url, options).subscribe((response) => {
      let html;
      const xml = new DOMParser().parseFromString(response, "text/xml");
      this.contents.next(Array.prototype.map.call(
          xml.querySelectorAll('contents > file'),
          (file) => this.parseFile(file)
        )
      );
    });
  }

  parseFile (file: Element): Object {

    if (file.getAttribute('refid')) {
      throw new Error('file element with refid');
    }

    const id = file.getAttribute('id');
    const title = file.getAttribute('title');
    const captionElement = file.querySelector('caption');
    const caption = (captionElement ? captionElement.textContent : '');
    const formats = Array.prototype.map.call(
      file.querySelectorAll('format'), (format) => this.parseFormat(format));

    return {
      id: id,
      title: title,
      caption: caption,
      formats: formats
    };
  }

  parseFormat (format: Element): Object {
    let result,
        content;

    const href = format.getAttribute('href');
    const type = format.getAttribute('type');

    try {
      result = {
        href: href,
        type: type,
        url: null,
        length: 0
      };

      content = this.getContent(href);
      result.url = content.url;
      result.length = content.length;
    } catch (e) {
      if (console && console.error) {
        console.error(e.stack);
      }
    }

    return result;
  }
}


