import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

/**
 * DYFI Service
 */
@Injectable()
export class ShakeAlertService {
  error: any = null;
  summary$: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(private httpClient: HttpClient) {}

  /**
   * Grab and parse summary.json contents
   *
   * @param product
   *     shake-alert product
   */
  getSummary(product: any) {
    console.log(product);
    if (!product || !product.contents['summary.json']) {
      this.summary$.next(null);
      return;
    }

    const summary = product.contents['summary.json'];

    this.httpClient
      .get(summary.url)
      .pipe(catchError(this.handleError()))
      .subscribe(response => {
        try {
          this.summary$.next(response);
        } catch (e) {
          /*  Processing errored */
          this.error = e;
          this.summary$.next(null);
        }
      });
  }

  /**
   * Error handler for http requests.
   */
  private handleError() {
    return (error: HttpErrorResponse): Observable<any> => {
      this.error = error;
      return of(null);
    };
  }
}
