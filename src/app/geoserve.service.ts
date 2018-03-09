import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../environments/environment';

@Injectable()
export class GeoserveService {

  constructor (
    private http: HttpClient
  ) { }


  /**
   * Regions helper endpoint. Makes request for FE region information
   * from geoserve web service.
   *
   * @param latitude {String|Number}
   *     Latitude coordinate for location of interest
   * @param longitude {String|Number}
   *     Longitude coordinate for location of interest
   *
   * @return {Observable}
   *     The result of HttpClient.get to be subscribed to externally.
   *
   * @see GeoserveService#regions
   */
  fe (latitude: string|number, longitude: string|number) {
    return this.regions(latitude, longitude, 'fe');
  }

  /**
   * Makes a request to the geoserve web service regions end point.
   *
   * @param latitude {String|Number}
   *     Latitude coordinate for location of interest
   * @param longitude {String|Number}
   *     Longitude coordinate for location of interest
   *
   * @return {Observable}
   *     The result of HttpClient.get to be subscribed to externally.
   */
  regions (latitude: string|number, longitude: string|number,
      type: string = null) {
    const url = `${environment.GEOSERVE_SERVICE}/regions.json`;
    const params = [
      `latitude=${latitude}`,
      `longitude=${longitude}`
    ];

    if (type !== null) {
      params.push(`type=${type}`);
    }

    return this.http.get<any>(`${url}?${params.join('&')}`);
  }

  // TODO :: Add more methods to interact with WS? Maybe pull in from
  //         earthquake-geoserve-ui project, but maybe these work
  //         differently enough. Not sure.
}
