import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { xmlToJson } from '../xml-to-json';
import { Quakeml } from '../quakeml';

@Injectable()
export class QuakemlService {

  public quakeml$: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  public error: any = null;

  constructor (
    public httpClient: HttpClient
  ) { }

  getQuakeml (product: any): void {
    try {
      if (product.phasedata) {
        product = product.phasedata;
      }
      const quakeml = product.contents['quakeml.xml'];
      const options = {responseType: 'text' as 'text'};

      this.httpClient.get(quakeml.url, options).pipe(
        catchError(this.handleError())
      ).subscribe((response) => {
        try {
          this.quakeml$.next(this.parseResponse(response));
        } catch (e) {
          this.error = e;
          this.quakeml$.next(null);
        }
      });
    } catch (e) {
      this.error = e;
      this.quakeml$.next(null);
    }
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

  parseResponse (response: string) {
    if (response === null) {
      return null;
    }
    return new Quakeml(xmlToJson(response));
  }

}
