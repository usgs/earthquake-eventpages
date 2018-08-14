import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { BehaviorSubject ,  Observable ,  of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Quakeml } from '../quakeml';
import { xmlToJson } from '../xml-to-json';


/**
 * Service to parse the xml from the quakeml data
 */
@Injectable()
export class QuakemlService {

  quakeml$: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  error: any = null;

  constructor (
    public httpClient: HttpClient
  ) { }


  /**
   * Gets the quakeml data from the event product
   *
   * @param product
   *     The event product
   */
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
   * Error handler for http requests
   *
   * @returns
   *    returns error
   */
  private handleError () {
    return (error: HttpErrorResponse): Observable<any> => {
      this.error = error;
      return of(null);
    };
  }

  /**
   * Parses xml data to json
   *
   * @param response
   *     The http response with xml
   * @returns
   *     The parsed response object
   */
  parseResponse (response: string) {
    if (response === null) {
      return null;
    }
    return new Quakeml(xmlToJson(response));
  }

}
