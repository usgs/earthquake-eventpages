import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable, of} from 'rxjs';
import { catchError } from 'rxjs/operators';


@Injectable()
export class DyfiService {
  public cdiZip$: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  public error: any = null;
  public plotAtten$: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  public plotNumResp$: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor (private httpClient: HttpClient) { }

  /**
   * Grab dyfi_plot_atten.json product
   */
  getAtten (product: any) {
    if ((product == null) ||
          (!product.contents['dyfi_plot_atten.json'])) {

      this.plotAtten$.next(null);
      return;
    }

    const atten = product.contents['dyfi_plot_atten.json'];

    this.httpClient.get(atten.url).pipe(
      catchError(this.handleError())
    ).subscribe((response) => {
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
   * Grab dyfi_plot_numresp.json product
   */
  getNumResp (product: any) {
    if ((product == null) ||
          (!product.contents['dyfi_plot_numresp.json'])) {

      this.plotNumResp$.next(null);
      return;
    }

    const numResp = product.contents['dyfi_plot_numresp.json'];

    this.httpClient.get(numResp.url).pipe(
      catchError(this.handleError())
    ).subscribe((response) => {
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

  getCdi (product: any) {
    if ((product == null) ||
          (!product.contents['cdi_zip.xml'])) {

      this.cdiZip$.next(null);
      return;
    }
    const cdiZip = product.contents['cdi_zip.xml'];

    this.httpClient.get(cdiZip.url, {responseType: 'text'}).pipe(
      catchError(this.handleError())
    ).subscribe((response) => {
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
   * Convert data from DYFI format to ngx-charts
   */
  onData (dyfiData) {
    if (dyfiData === null) {
      return null;
    }

    const series = [];
    let ngx_dataset,
        ngx_data;

    for (const dataset of dyfiData.datasets) {
      ngx_dataset = {
        name: dataset.legend || 'Responses',
        class: dataset.class,
        series: []
      };

      for (const data of dataset.data) {
        ngx_data = {
          x: data.x,
          y: data.y,
          value: data.y,
          name: data.x
        };

        if (data.stdev) {
          ngx_data.max = data.y + data.stdev;
          ngx_data.min = data.y - data.stdev;
        }

        ngx_dataset.series.push(ngx_data);
      }

      series.push(ngx_dataset);
    }

    dyfiData.series = series;
    return dyfiData;
  }

  translateCdi (cdiData) {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(cdiData, 'text/xml');

    const data = xmlDoc.getElementsByTagName('location');
    const responsesArray = [];
    let locationName, locations, location,
        node, nodeName, nodeValue;

    for (let x = 0; x < data.length; x++) {

      locationName = data[x].getAttribute('name');
      locations = data[x].childNodes;
      location = {
        id: x,  // Assign an ID for sorting caching
        zip: '' // Provide empty default to prevent undefined
      };

      for (let i = 0; i < locations.length; i++) {

        node = locations[i];
        nodeName = node.nodeName;
        nodeValue = node.textContent;

        if (nodeName === 'name' ||
            nodeName === 'state' ||
            nodeName === 'country' ||
            nodeName === 'zip') {
          location[nodeName] = nodeValue;
        } else if (
            nodeName === 'cdi' ||
            nodeName === 'dist' ||
            nodeName === 'lat' ||
            nodeName === 'lon') {
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
  private handleError () {
    return (error: HttpErrorResponse): Observable<any> => {
      this.error = error;
      return of(null);
    };
  }
}
