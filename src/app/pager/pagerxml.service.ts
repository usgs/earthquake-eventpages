import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { BehaviorSubject,  Observable,  of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { xmlToJson } from '../xml-to-json';

/**
 * Parses pager.xml into the observable seqeunce pagerXml$
 */
@Injectable()
export class PagerXmlService {

  error: any = null;
  pagerXml$: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor (
    public httpClient: HttpClient
  ) { }

  /**
   * Make an xhr request to get pager.xml update observable sequence
   *
   * @param product
   *     pager product
   */
  getPagerXml (product: any): void {
    try {
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

  /**
   * Parse the pager.xml response into more easily consumable parts:
   *  - alerts
   *  - exposures
   *  - cities
   *  - comments
   *
   * @param response
   *     pager.xml document
   */
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
   * Parse the alerts from the pager.xml
   *
   * @param xml
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
   * Parse the cities array from the pager.xml
   *
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
   * Parse the comments from the pager.xml
   *
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

    data.impact = this._parseImpactComments(pager.impact_comment);

    return data;
  }

  /**
   * Parse the impact comments from the pager.xml comments
   *
   * @param comment {String}
   *      The string representing the combinded economic and fatality
   *      impact comment
   *
   * @return {Object}
   *      An object containing parsed impact comment information.
   *      Keyed by impact comment type.
   */
  _parseImpactComments (comment) {
    let impact;

    // TODO :: This is a cluster. PAGER team should sort out a better way to
    //         send comments of this nature.
    if (!comment || comment === '' || typeof comment === 'object') {
      return null;
    }

    impact = {};

    comment = comment.trim().split('#').reverse();
    if (comment[0].indexOf('economic') !== -1) {
      comment.reverse();
    }

    // name the comments
    if (comment.length === 2) {
      if (comment[0] !== '') {
        impact.fatality = comment[0];
        impact.economic = comment[1];
      } else {
        impact.fatality = comment[1];
      }
    } else {
      impact.fatality = comment[0];
    }

    return impact;
  }


  /**
   * Parse the population exposures from the pager.xml
   *
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

    const roman = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'];
    const shaking = ['Not Felt', 'Weak', 'Weak', 'Light', 'Moderate', 'Strong',
        'Very Strong', 'Severe', 'Violent', 'Extreme'];

    data = [];
    exposures = pager.exposure;

    for (let i = 0, len = exposures.length; i < len; i++) {
      data.push({
        dmin: parseFloat(exposures[i].dmin),
        dmax: parseFloat(exposures[i].dmax),
        exposure: parseInt(exposures[i].exposure, 10),
        rangeInsideMap: (exposures[i].rangeInsideMap === '1'),
        roman: roman[i],
        shaking: shaking[i]
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
        rangeInsideMap: rangeInsideMap,
        roman: 'II-III',
        shaking: 'Weak'
      });
    }

    return data;
  }
}
