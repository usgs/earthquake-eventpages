import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, Input } from '@angular/core';

import { BehaviorSubject, of, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

/**
 * Shared text product component
 *
 * @param contentPath
 *     The path to content to render
 */
@Component({
  selector: 'shared-text-product',
  styleUrls: ['./text-product.component.scss'],
  templateUrl: './text-product.component.html'
})
export class TextProductComponent {
  _product: any;
  content = new BehaviorSubject<any>(null);
  readonly content$ = this.content.asObservable();
  @Input()
  contentPath = '';
  error: any;

  constructor(public httpClient: HttpClient) {}

  /**
   * fetch text-product and get contents
   *
   * @returns {of | null}
   */
  getContent() {
    if (!this.product) {
      this.error = null;
      this.content.next(null);
      return;
    }

    const content = this.product.contents[this.contentPath];
    if (!content) {
      this.error = new Error('no content');
      this.content.next(null);
      return;
    }

    this.error = null;
    if (content.bytes) {
      this.content.next(content.bytes);
    } else if (content.url) {
      const options = { responseType: 'text' as 'text' };

      this.httpClient
        .get(content.url, options)
        .pipe(
          catchError(
            (err: HttpErrorResponse): Observable<any> => {
              this.error = err;
              return of(null);
            }
          )
        )
        .subscribe(data => {
          this.content.next(data);
        });
    } else {
      this.error = new Error('no content bytes or url');
      this.content.next(null);
    }
  }

  /**
   * Set text-product and call getContent
   *
   * @param product
   *     text-product product
   */
  @Input()
  set product(product) {
    this._product = product;
    this.getContent();
  }

  /**
   * Get text-product
   *
   * @returns
   *     text-product product
   */
  get product() {
    return this._product;
  }

  /**
   * Helper method to turn relative paths into absolute paths in
   * text-product text.
   *
   * @param text
   *
   * @return {string}
   *     formatted text
   */
  replaceRelativePaths(text: string) {
    const product = this.product || {};
    const contents = product.contents || {};

    // replace relative urls with absolute urls
    for (const path in contents) {
      if (!path) {
        // no url to empty path
        continue;
      }
      text = text.replace(
        new RegExp('"' + path + '"', 'g'),
        '"' + contents[path].url + '"'
      );
    }

    return text;
  }
}
