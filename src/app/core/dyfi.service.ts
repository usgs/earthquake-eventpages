import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { BehaviorSubject ,  Observable ,  of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class DyfiService {
  public error: any = null;

  public plotAtten$: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  public plotNumResp$: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(private httpClient: HttpClient) { }

  getAllReported() {

  }

  getAtten(product: any) {
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

  getNumResp(product: any) {
    if ((product == null) ||
          (!product.contents['dyfi_plot_numresp.json'])) {

      this.plotAtten$.next(null);
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

  /**
   * Convert data from DYFI format to ngx-charts
   */
  onData(dyfiData) {
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
