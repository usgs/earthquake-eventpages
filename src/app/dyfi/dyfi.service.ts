import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

/**
 * DYFI Service
 */
@Injectable()
export class DyfiService {
  cdiZip$: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  error: any = null;
  plotAtten$: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  plotNumResp$: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(private httpClient: HttpClient) {}

  /**
   * Grab and parse dyfi_plot_atten.json product
   *
   * @param product
   *     dyfi product
   */
  getAtten(product: any) {
    if (product === null || !product.contents['dyfi_plot_atten.json']) {
      this.plotAtten$.next(null);
      return;
    }

    const atten = product.contents['dyfi_plot_atten.json'];

    this.httpClient
      .get(atten.url)
      .pipe(catchError(this.handleError()))
      .subscribe(response => {
        try {
          const dyfiData = this.onData(response);
          this.plotAtten$.next(dyfiData);
        } catch (e) {
          /*  Processing errored */
          this.error = e;
          this.plotAtten$.next(null);
        }
      });
  }

  /**
   * Grab and parse cdi_zip.xml product
   *
   * @param product
   *     dyfi product
   */
  getCdi(product: any) {
    if (product === null || !product.contents['cdi_zip.xml']) {
      this.cdiZip$.next(null);
      return;
    }
    const cdiZip = product.contents['cdi_zip.xml'];

    this.httpClient
      .get(cdiZip.url, { responseType: 'text' })
      .pipe(catchError(this.handleError()))
      .subscribe(response => {
        try {
          const cdiZipJson = this.translateCdi(response);
          this.cdiZip$.next(cdiZipJson);
        } catch (e) {
          /*  Processing errored */
          this.error = e;
          this.cdiZip$.next(null);
        }
      });
  }

  /**
   * Grab and parse dyfi_plot_numresp.json product
   *
   * @param product
   *     dyfi product
   */
  getNumResp(product: any) {
    if (product === null || !product.contents['dyfi_plot_numresp.json']) {
      this.plotNumResp$.next(null);
      return;
    }

    const numResp = product.contents['dyfi_plot_numresp.json'];

    this.httpClient
      .get(numResp.url)
      .pipe(catchError(this.handleError()))
      .subscribe(response => {
        try {
          const dyfiData = this.onData(response);
          this.plotNumResp$.next(dyfiData);
        } catch (e) {
          /*  Processing errored */
          this.error = e;
          this.plotNumResp$.next(null);
        }
      });
  }

  /**
   * Convert data from DYFI format to ngx-charts
   *
   * @param dyfiData
   *     dyfi product
   */
  onData(dyfiData: any) {
    if (dyfiData === null) {
      return null;
    }

    const series = [];
    let ngxDataset, ngxData;

    for (const dataset of dyfiData.datasets) {
      ngxDataset = {
        class: dataset.class,
        name: dataset.legend || 'Responses',
        series: []
      };

      for (const data of dataset.data) {
        ngxData = {
          name: data.x,
          value: data.y,
          x: data.x,
          y: data.y
        };

        if (data.stdev) {
          ngxData.max = data.y + data.stdev;
          ngxData.min = data.y - data.stdev;
        }

        // check for repeat data and add to array
        if (ngxDataset.series.length > 0 &&
            ngxDataset
            .series[ngxDataset.series.length - 1]
            .name === data.x) {
          ngxDataset.series[ngxDataset.series.length - 1] = ngxData;
        } else {
          ngxDataset.series.push(ngxData);
        }
      }

      series.push(ngxDataset);
    }

    dyfiData.series = series;
    return dyfiData;
  }

  /**
   *
   * @param cdiData
   *     cdi data/ responses from dyfi product
   */
  translateCdi(cdiData: any) {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(cdiData, 'text/xml');

    const data = xmlDoc.getElementsByTagName('location');
    const responsesArray = [];
    let locationName, locations, location, node, nodeName, nodeValue;

    for (let x = 0; x < data.length; x++) {
      locationName = data[x].getAttribute('name');
      locations = data[x].childNodes;
      location = {
        id: x, // Assign an ID for sorting caching
        zip: '' // Provide empty default to prevent undefined
      };

      for (let i = 0; i < locations.length; i++) {
        node = locations[i];
        nodeName = node.nodeName;
        nodeValue = node.textContent;

        if (
          nodeName === 'name' ||
          nodeName === 'state' ||
          nodeName === 'country' ||
          nodeName === 'zip'
        ) {
          location[nodeName] = nodeValue;
        } else if (
          nodeName === 'cdi' ||
          nodeName === 'dist' ||
          nodeName === 'lat' ||
          nodeName === 'lon'
        ) {
          location[nodeName] = parseFloat(nodeValue);
        } else if (nodeName === 'nresp') {
          location[nodeName] = parseInt(nodeValue, 10);
        }
      }

      // determine country/ add zip code to name
      if (locationName.length === 5) {
        location.country = 'United States of America';
        location.zip = locationName;
      } else {
        locationName = locationName.split('::');
        location.state = locationName[1];
        location.country = locationName[2];
      }

      responsesArray.push(location);
    }

    return responsesArray;
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
