import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

/**
 * DYFI Service
 */
@Injectable()
export class ShakeAlertService {
  mockSummary = {
    type: 'USGSEarlyWarningSummary',
    version: '1.0',
    properties: {
      id: 'ew810',
      time: '2019-03-02 05:55:56.920000Z',
      elapsed: 210.58,
      epicenter: { type: 'Point', coordinates: [-124.4976654, 40.3013344] },
      depth: 19.26,
      magnitude: 3.86,
      title: '36 miles SW of Ferndale',
      num_stations_10km: 0,
      num_stations_100km: 6,
      created: '2019-03-22 00:45:21 (Pacific)'
    },
    cities: {
      type: 'FeatureCollection',
      id: 'cityCollection',
      features: [
        {
          type: 'Feature',
          id: 'city1',
          geometry: {
            type: 'Point',
            coordinates: [-124.263944, 40.576242]
          },
          properties: {
            name: 'Ferndale',
            citydist: 36.0,
            warning_time: 0.0,
            mmi: 1.0
          }
        },
        {
          type: 'Feature',
          id: 'city2',
          geometry: { type: 'Point', coordinates: [-124.106436, 40.4993] },
          properties: {
            name: 'Rio Dell',
            citydist: 39.0,
            warning_time: 0.0,
            mmi: 1.0
          }
        },
        {
          type: 'Feature',
          id: 'city3',
          geometry: {
            type: 'Point',
            coordinates: [-124.157275, 40.598186]
          },
          properties: {
            name: 'Fortuna',
            citydist: 43.0,
            warning_time: 0.0,
            mmi: 1.0
          }
        },
        {
          type: 'Feature',
          id: 'city4',
          geometry: { type: 'Point', coordinates: [-121.4944, 38.581572] },
          properties: {
            name: 'Sacramento',
            citydist: 321.0,
            warning_time: 69.0,
            mmi: 1.0
          }
        }
      ]
    },
    initial_alert: {
      type: 'FeatureCollection',
      id: 'initialAlertCollection',
      properties: {
        elapsed: 21.601,
        magnitude: 4.3886,
        num_stations: 6,
        location_azimuth_error: 254,
        location_distance_error: 66.3,
        caption:
          'Figure 1. Map showing initial alert area (polygon at MMI IV or highest lesser intensity) and approximate warning times (open circles).  Red circle is the location of shaking front at the time of first alert.  Blue balloon marks the ANSS network location.'
      },
      features: [
        {
          type: 'Feature',
          id: 'initialEpicenter',
          geometry: { type: 'Point', coordinates: [-125.7005, 40.028] },
          properties: { name: 'Earthquake Epicenter' }
        },
        {
          type: 'Feature',
          id: 'initialPolygon',
          geometry: {
            type: 'Polygon',
            coordinates: [
              [
                [-125.7005, 40.0589],
                [-125.6719, 40.0499],
                [-125.6601, 40.028],
                [-125.6719, 40.0061],
                [-125.7005, 39.9971],
                [-125.7291, 40.0061],
                [-125.7409, 40.028],
                [-125.7291, 40.0499],
                [-125.7005, 40.0589]
              ]
            ]
          },
          properties: { stroke: 'blue', fill: 'transparent' }
        },
        {
          type: 'Feature',
          id: 'acircle_0.0',
          geometry: {
            type: 'Point',
            coordinates: [-124.4976654, 40.3013344]
          },
          properties: {
            radius: 74225.4622121176,
            radiusunits: 'm',
            circletime: 0.0,
            tunits: 's',
            color: 'crimson',
            fill: 'transparent'
          }
        },
        {
          type: 'Feature',
          id: 'acircle_10.0',
          geometry: {
            type: 'Point',
            coordinates: [-124.4976654, 40.3013344]
          },
          properties: {
            radius: 110517.8776967894,
            radiusunits: 'm',
            circletime: 10.0,
            tunits: 's',
            color: '#3f3f3f',
            fill: 'transparent'
          }
        },
        {
          type: 'Feature',
          id: 'acircle_20.0',
          geometry: {
            type: 'Point',
            coordinates: [-124.4976654, 40.3013344]
          },
          properties: {
            radius: 146422.27747375908,
            radiusunits: 'm',
            circletime: 20.0,
            tunits: 's',
            color: '#7f7f7f',
            fill: 'transparent'
          }
        },
        {
          type: 'Feature',
          id: 'acircle_30.0',
          geometry: {
            type: 'Point',
            coordinates: [-124.4976654, 40.3013344]
          },
          properties: {
            radius: 182168.23375825572,
            radiusunits: 'm',
            circletime: 30.0,
            tunits: 's',
            color: '#bfbfbf',
            fill: 'transparent'
          }
        }
      ]
    },
    final_alert: {
      type: 'FeatureCollection',
      id: 'finalAlertCollection',
      properties: {
        elapsed: 27.607,
        magnitude: 4.0705,
        num_stations: 9,
        location_azimuth_error: 264,
        location_distance_error: 49.4,
        caption:
          'Figure 2. Map showing initial and final shaking intensity contours'
      },
      features: [
        {
          type: 'Feature',
          id: 'finalEpicenter',
          geometry: { type: 'Point', coordinates: [-125.4297, 40.2253] },
          properties: { name: 'Earthquake Epicenter' }
        },
        {
          type: 'Feature',
          id: 'initialPolygon',
          geometry: {
            type: 'Polygon',
            coordinates: [
              [
                [-125.7005, 40.0589],
                [-125.6719, 40.0499],
                [-125.6601, 40.028],
                [-125.6719, 40.0061],
                [-125.7005, 39.9971],
                [-125.7291, 40.0061],
                [-125.7409, 40.028],
                [-125.7291, 40.0499],
                [-125.7005, 40.0589]
              ]
            ]
          },
          properties: { stroke: 'blue', fill: 'transparent' }
        },
        {
          type: 'Feature',
          id: 'finalpoly_0',
          geometry: {
            type: 'Polygon',
            coordinates: [
              [
                [-125.4297, 40.2782],
                [-125.3807, 40.2627],
                [-125.3604, 40.2253],
                [-125.3807, 40.1879],
                [-125.4297, 40.1724],
                [-125.4787, 40.1879],
                [-125.499, 40.2253],
                [-125.4787, 40.2627],
                [-125.4297, 40.2782]
              ]
            ]
          },
          properties: { stroke: '#a0e6ff', fill: 'transparent' }
        },
        {
          type: 'Feature',
          id: 'finalpoly_1',
          geometry: {
            type: 'Polygon',
            coordinates: [
              [
                [-125.4297, 40.4209],
                [-125.2482, 40.3635],
                [-125.1735, 40.225],
                [-125.2489, 40.0869],
                [-125.4297, 40.0297],
                [-125.6105, 40.0869],
                [-125.6859, 40.225],
                [-125.6112, 40.3635],
                [-125.4297, 40.4209]
              ]
            ]
          },
          properties: { stroke: '#bfccff', fill: 'transparent' }
        }
      ]
    }
  };
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
          // this.summary$.next(response);
          this.summary$.next(this.mockSummary);
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
