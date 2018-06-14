import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';


@Injectable()
export class OafService {

  public oaf$: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  public forecast$: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  public model$: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor () { }

  getOaf (product: any): void {
    try {
      const bytes = product.contents[''].bytes;
      const oaf = this.parseOaf(bytes);
      const forecast = this.parseForecast(oaf.forecast);
      const model = this.parseModel(oaf.model);

      this.oaf$.next(oaf);
      this.forecast$.next(forecast);
      this.model$.next(model);
    } catch (e) {
      this.oaf$.next(null);
      this.forecast$.next(null);
      this.model$.next(null);
    }
  }

  parseForecast (forecasts: any): any {
    const columns = [];
    const columnIds = ['magnitude'];
    const rows = [];

    forecasts.forEach((forecast, fIndex) => {
      const id = forecast.label.replace(' ', '_');
      columnIds.push(id);

      columns.push({
        id,
        label: forecast.label,
        timeStart: forecast.timeStart,
        timeEnd: forecast.timeEnd
      });

      forecast.bins.forEach((bin, bIndex) => {
        if (fIndex === 0) {
          rows[bIndex] = {
            magnitude: bin.magnitude,
            data: {}
          };
        }
        rows[bIndex].data[id] = bin;
      });
    });

    return {
      columnIds,
      columns,
      rows
    };
  }

  parseModel (model: any): any {
    return {
      ref: model.ref,
      name: model.name,
      parameters: {
        keys: Object.keys(model.parameters),
        values: model.parameters
      }
    };
  }

  parseOaf (bytes: any): any {
    return JSON.parse(bytes);
  }
}
