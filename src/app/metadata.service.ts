import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators/catchError';
import { of } from 'rxjs/observable/of';

@Injectable()
export class MetadataService {
  public error: any = null;
  public metadata: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(private httpClient: HttpClient) { }

  /**
   * Retreive metadata for a specifc shakemap
   * 
   * @param product shakemap product json
   */
  getMetadata (product: any): void {
    if (product == null) {
      this.metadata.next(null);
      return
    }
    const metadata = product.contents['download/info.json'];

    this.httpClient.get(metadata.url).pipe(
      catchError(this.handleError())
    ).subscribe((response) => {
      this.metadata.next(response);
    }, (e) => {
      /*  Subscribe errored */
      this.error = e;
      this.metadata.next(null);
    });
  }

  /**
   * Error handler for http requests.
   */
  private handleError () {
    return (error: HttpErrorResponse): Observable<any> => {
      this.error = error;
      return of(null);
    };
  }
}
