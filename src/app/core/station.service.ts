import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators/catchError';
import { of } from 'rxjs/observable/of';

@Injectable()
export class StationService {
  public error: any = null;

  public stationsJson$: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(private httpClient: HttpClient) { }

  /**
   * Retreive a station list for a specifc shakemap
   *
   * @param product shakemap product json
   */
  getStations (product: any): void {
    if ((product == null) ||
          (!product.contents['download/stationlist.json'])) {

      this.stationsJson$.next(null);
      return;
    }

    const stations = product.contents['download/stationlist.json'];

    this.httpClient.get(stations.url).pipe(
      catchError(this.handleError())
    ).subscribe((response) => {
      try {
        this.onStations(response);
      } catch (e) {
        /*  Processing errored */
        this.error = e;
        this.stationsJson$.next(null);
      }
    });
  }

  /**
   * Handle incoming stationlist.json
   *
   * @param stations station list geoJSON object
   */
  onStations (stations) {
    if (stations) {

      stations = this.translate(stations);
      this.stationsJson$.next(stations);

    } else {
      this.stationsJson$.next(null);
    }
  }

  /**
   * Make stationlist.json from older versions compliant
   *
   * @param stations station list geoJSON object
   */
  translate (stations) {
    const new_stations: any[] = [];

    for (const station of stations.features) {
      for (const item of Object.keys(station.properties)) {

        if ((station.properties[item] === 'null') ||
              (station.properties[item] === 'nan')) {
          station.properties[item] = null;
        }

      }

      new_stations.push(station);
    }
    stations.features = new_stations;

    return stations;
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
