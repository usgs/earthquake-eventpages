import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

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
    const translateNames = {
      'sa(0.3)': 'psa03',
      'sa(1.0)': 'psa10',
      'sa(3.0)': 'psa30',
    };

    station.channels = station.properties.channels.map((channel) => {

      // set required attributes to empty object,
      // so obj.value or obj.units would still evaluate but to undefined
      const parsed = {
        name: channel.name,
        pga: {},
        pgv: {},
        psa03: {},
        psa10: {},
        psa30: {}
      };

      // populate parsed object
      channel.amplitudes.forEach((amp) => {
        const name = translateNames[amp.name] || amp.name;
        parsed[name] = amp;
      });

      return parsed;
    });

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
