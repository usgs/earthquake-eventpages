import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators/catchError';
import { of } from 'rxjs/observable/of';

import { xmlToJson } from '../xml-to-json';
import { Quakeml } from '../quakeml';


@Injectable()
export class PagerXmlService {

  public pagerXml$: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  public error: any = null;

  constructor (
    public httpClient: HttpClient
  ) { }

  getPagerXml (product: any): void {
    try {
      if (product.losspager) {
        product = product.losspager;
      }
      const contents = product.contents['pager.xml'];
      const options = {responseType: 'text' as 'text'};

      this.httpClient.get(contents.url, options).pipe(
        catchError(this.handleError())
      ).subscribe((response) => {
        try {
          this.pagerXml$.next(this.parseResponse(response));
        } catch (e) {
          this.error = e;
          this.pagerXml$.next(null);
        }
      });
    } catch (e) {
      this.error = e;
      this.pagerXml$.next(null);
    }
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

  parseResponse (response: string) {
    let pager,
        xml;

    if (response === null) {
      return null;
    }

    xml =  xmlToJson(response);
    pager = xml.pager;

    if (!pager) {
      return null;
    }

    return {
      alerts: this._parseAlerts(pager),
      exposures: this._parseExposures(pager),
      cities: this._parseCities(pager),
      comments: this._parseComments(pager)
    };
  }

  /**
   * @param xml {Document}
   *      The object representation of the PAGER XML document.
   *
   * @return {Object}
   *      An object of parsed alert information. Keyed by alert type.
   */
  _parseAlerts (pager: any) {
    let alert,
        alerts,
        data;

    if (!pager || !pager.alert) {
      return null;
    }

    data = {};
    alerts = pager.alert;

    for (let i = 0, len = alerts.length; i < len; i++) {
      alert = alerts[i];
      data[alert.type] = alert;
    }

    return data;
  }

  /**
   * @param xml {Document}
   *      The object representation of the PAGER XML document.
   *
   * @return {Array}
   *      An array of parsed city information.
   */
  _parseCities (pager: any) {
    let cities,
        city,
        data;


    if (!pager || !pager.city) {
      return null;
    }

    data = [];
    cities = pager.city;

    for (let i = 0, len = cities.length; i < len; i++) {
      city = cities[i];
      data.push({
        name: city.name,
        latitude: parseFloat(city.lat),
        longitude: parseFloat(city.lon),
        population: parseInt(city.population, 10),
        mmi: parseFloat(city.mmi),
        isCapital: (city.iscapital === '1')
      });
    }

    return data;
  }

  /**
   * @param xml {Document}
   *      The object representation of the PAGER XML document.
   *
   * @return {Object}
   *      An object containing parsed comment information. Keyed by comment
   *      type.
   */
  _parseComments (pager: any) {
    let effects,
        data,
        impact,
        structure;

    if (!pager || (
        !pager.structcomment &&
        !pager.secondary_effects &&
        !pager.impact_comment)) {
      return null;
    }

    data = {};

    structure = pager.structcomment;
    if (structure && structure !== '' && typeof structure !== 'object') {
      data.structure = structure.trim();
    }

    effects = pager.secondary_effects;
    if (effects && effects !== '' && typeof effects !== 'object') {
      data.effects = effects.trim();
    }

    // TODO :: This is a cluster. PAGER team should sort out a better way to
    //         send comments of this nature.
    impact = pager.impact_comment;
    if (impact && impact !== '' && typeof impact !== 'object') {
      impact = impact.trim().split('#').reverse();
      if (impact[0].indexOf('economic') !== -1) {
        impact.reverse();
      }

      data.impact = {};

      // name the comments
      if (impact.length === 2) {
        if (impact[0] !== '') {
          data.impact.fatality = impact[0];
          data.impact.economic = impact[1];
        } else {
          data.impact.fatality = impact[1];
        }
      } else {
        data.impact.fatality = impact[0];
      }
    }

    return data;
  }


  /**
   * @param xml {Document}
   *      The object representation of the PAGER XML document.
   *
   * @return {Array}
   *      An array of parsed exposure information.
   */
  _parseExposures (pager: any) {
    let data,
        exposure,
        exposures,
        rangeInsideMap;

    if (!pager || !pager.exposure) {
      return null;
    }

    data = [];
    exposures = pager.exposure;

    for (let i = 0, len = exposures.length; i < len; i++) {
      data.push({
        dmin: parseFloat(exposures[i].dmin),
        dmax: parseFloat(exposures[i].dmax),
        exposure: parseInt(exposures[i].exposure, 10),
        rangeInsideMap: (exposures[i].rangeInsideMap === '1'),
      });
    }

    // Generally not required. If it becomes a problem, this will sort it out.
    data.sort(function (a, b) {
      return a.dmin - b.dmin;
    });


    // Combine bins II-III together
    if (data[1] && data[2]) {
      exposure = data[1].exposure + data[2].exposure;
      rangeInsideMap = (data[1].rangeInsideMap && data[2].rangeInsideMap);

      data.splice(1, 2, {
        dmin: 1.5,
        dmax: 3.5,
        exposure: exposure,
        rangeInsideMap: rangeInsideMap
      });
    }

    return data;
  }
}
