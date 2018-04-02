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

    for (let station of stations.features) {
      station = this.translateNan(station);
      station = this.translateAmps(station);

      new_stations.push(station);
    }
    stations.features = new_stations;

    return stations;
  }

  /**
   * Convert string 'NaN' and 'null' to actual null
   */
  translateNan (station) {
    for (const item of Object.keys(station.properties)) {
      if ((station.properties[item] === 'null') ||
            (station.properties[item] === 'nan')) {
        station.properties[item] = null;
      }
    }

    return station;
  }

/**
 * Converts amplitude array into object
 */
  translateAmps (station) {
    const channels = station.properties.channels;

    for (const channel of channels) {
      const amps = channel.amplitudes;
      channel.amplitudes = {};

      // if amplitudes is already converted, return
      if (!Array.isArray(amps)) {
        continue;
      }

      for (const amp of amps) {
        channel.amplitudes[amp.name] = amp;
      }
    }

    return station;
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
