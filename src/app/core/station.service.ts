import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators/catchError';
import { of } from 'rxjs/observable/of';

@Injectable()
export class StationService {
  public error: any = null;
  public stations: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(private httpClient: HttpClient) { }

  /**
   * Retreive a station list for a specifc shakemap
   *
   * @param product shakemap product json
   */
  getStations (product: any): void {
    if (product == null) {
      this.stations.next(null);
      return;
    }
    const stations = product.contents['download/stationlist.json'];

    this.httpClient.get(stations.url).pipe(
      catchError(this.handleError())
    ).subscribe((response) => {
      this.stations.next(response);
    }, (e) => {
      /*  Subscribe errored */
      this.error = e;
      this.stations.next(null);
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
