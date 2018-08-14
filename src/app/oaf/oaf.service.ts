import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

/**
 * A service that parses an oaf product into more consumable bits,
 * the forecast and model objects
 */
@Injectable()
export class OafService {
  oaf$: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  forecast$: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  model$: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  /**
   * Updates the observable streams for: oaf, forecast, and model
   *
   * @param product
   *     A oaf type product
   */
  getOaf(product: any): void {
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
  /**
   * Parse oaf forecasts into forecast bins based on time.
   *
   * @param model
   *     oaf.forecast object
   *
   * @return {any}
   *     object with forecast bins
   */
  parseForecast(forecasts: any): any {
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

  /**
   * Parse oaf model into object with parameters
   *
   * @param model
   *     oaf.model object
   */
  parseModel(model: any): any {
    return {
      ref: model.ref,
      name: model.name,
      parameters: {
        keys: Object.keys(model.parameters),
        values: model.parameters
      }
    };
  }

  /**
   * Parse OAF, JSON string, into object
   *
   * @param bytes
   *     JSON string
   *
   * @return {any}
   *     oaf object
   */
  parseOaf(bytes: any): any {
    return JSON.parse(bytes);
  }
}
