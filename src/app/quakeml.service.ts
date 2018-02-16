import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators/catchError';
import { of } from 'rxjs/observable/of';

import { xmlToJson } from './xml-to-json';
import { Quakeml } from './quakeml';

@Injectable()
export class QuakemlService {

  private quakeml: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  public readonly quakeml$: Observable<any> = this.quakeml.asObservable();

  constructor (
    public httpClient: HttpClient
  ) { }

  get (product: any): void {
    try {
      const quakeml = product.contents['quakeml.xml'];
      const options = {responseType: 'text' as 'text'};

      this.httpClient.get(quakeml.url, options).pipe(
        catchError(this.handleError())
      ).subscribe((response) => {
        this.quakeml.next(new Quakeml(xmlToJson(response)));
      });
    } catch (e) {
      this.quakeml.next(null);
    }
  }

  /**
   * Error handler for http requests.
   */
  private handleError () {
    return (error: HttpErrorResponse): Observable<any> => {
      return of(null);
    };
  }


}
