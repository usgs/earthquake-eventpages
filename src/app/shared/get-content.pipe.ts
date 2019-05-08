import { Pipe, PipeTransform } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { ProductContentPipe } from '@shared/product-content.pipe';

@Pipe({
  name: 'sharedGetContent'
})
export class GetContentPipe implements PipeTransform {
  constructor(public httpClient: HttpClient) {}


  /**
   * Download product content
   *
   * @param product
   *     Product with contents property
   * @param content
   *     Name of the content to download
   */
  getContent (product: any, content: string): Observable<any> {
    const pcPipe = new ProductContentPipe();
    const _content = pcPipe.transform(product, content);

    if (!_content) {
      of(null);
    }

    try {
      return this.httpClient
        .get(_content.url)
        .pipe(map(response => response))
        .pipe(catchError(this.handleError()));
    } catch (e) {
      return of(null);
    }
  }

  transform (product, content): any {
    if (!product || !content) {
      return null;
    }

    return this.getContent(product, content);
  }


  /**
   * Error handler for http requests
   *
   * @returns
   *    returns error
   */
  private handleError() {
    return (error: HttpErrorResponse): Observable<any> => {
      return of(null);
    };
  }
}
