import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';

import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable ()
export class ContentsXmlService {

  public contents$: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor (
    public httpClient: HttpClient
  ) { }

  get (product: any): void {
    try {
      const content = product.contents['contents.xml'];
      const options = {responseType: 'text' as 'text'}; // Yes, this is wierd.

      this.httpClient.get(content.url, options).pipe(
        catchError(this.handleError())
      ).subscribe((response) => {
        this.contents$.next(this.parseResponse(response, product));
      });

    } catch (e) {
      this.contents$.next(null);
    }
  }

  /**
   * Error handler for http requests.
   *
   */
  private handleError () {
    return (error: HttpErrorResponse): Observable<any> => {
      return of(null);
    };
  }

  parseFile (file: Element, product: any): Object {
    if (file.getAttribute('refid')) {
      throw new Error('file element with refid');
    }

    const id = file.getAttribute('id');
    const title = file.getAttribute('title');
    const captionElement = file.querySelector('caption');
    const caption = (captionElement ? captionElement.textContent : '');
    const formats = Array.prototype.map.call(
      file.querySelectorAll('format'),
      (format) => this.parseFormat(format, product)
    );

    return {
      id: id,
      title: title,
      caption: caption,
      formats: formats
    };
  }

  parseFormat (format: Element, product: any): Object {
    let result,
        content;

    try {
      const href = format.getAttribute('href');
      const type = format.getAttribute('type');

      result = {
        href: href,
        type: type,
        url: null,
        length: 0
      };

      content = product.contents[href] || {};
      result.url = content.url;
      result.length = content.length;
    } catch (e) {
      // This is okay and recoverable. Ignore.
    }

    return result;
  }

  parseResponse (response: string, product: any): Array<Object> {
    const xml = new DOMParser().parseFromString(response, 'text/xml');

    return Array.prototype.map.call(
      xml.querySelectorAll('contents > file'),
      (file) => this.parseFile(file, product)
    );
  }
}
