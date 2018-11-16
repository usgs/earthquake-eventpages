import {
  HttpClient,
  HttpErrorResponse,
  HttpResponse
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Observable, of, BehaviorSubject } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { Event } from '../event';
import { ScenarioEvent } from 'app/scenario-event';

/**
 * Event service, gets event, updates products, makes http calls dealing with
 * the specific event
 */
@Injectable()
export class EventService {
  event$ = new BehaviorSubject<Event>(new Event(null));
  product$ = new BehaviorSubject<any>(null);
  productCode: string;
  productSource: string;
  productType: string;

  constructor(public http: HttpClient, public router: Router) {}

  /**
   * Update event to be shown
   *
   * @param eventid
   *     the event id
   */
  getEvent(eventid: string): void {
    const url = this.getEventDetailsUrl(eventid);

    // clear existing information if requested event id is different
    // otherwise let browser caching determine whether to update
    if (this.event$.value.id !== eventid) {
      this.setEvent(new Event(null));
    }

    // load new information
    this.http
      .get<HttpResponse<any>>(url)
      .pipe(catchError(this.handleError(eventid)))
      .subscribe(response => {
        if (response.type === 'Error' && response.status === 409) {
          // handle 409 / deleted event
          this.getDeletedEvent(eventid);
          return;
        } else if (response.type === 'Error' && response.status === 404) {
          // handle 404 error
          this.getUnknownEvent(eventid);
          return;
        }
        if (response) {
          const isScenario = this.isScenarioEvent(response);
          if (isScenario) {
            this.setEvent(new ScenarioEvent(response));
          } else {
            this.setEvent(new Event(response));
          }
        }
      });
  }

  /**
   * Build url for event details
   *
   * @param eventid
   *      the event id
   */
  getEventDetailsUrl(eventid: string): string {
    let url;
    url = environment.scenario
      ? environment.SCENARIO_SERVICE.replace('{eventid}', eventid)
      : environment.EVENT_SERVICE.replace('{eventid}', eventid);
    return url;
  }

  /**
   * Update product to be shown
   *
   * @param type
   *     type of product
   * @param source
   *     source of product
   * @param code
   *     code of product
   */
  getProduct(type: string, source?: string, code?: string): void {
    this.productType = type;
    this.productSource = source;
    this.productCode = code;

    this.updateProduct();
  }

  /**
   * Handle an unkown event with a 404 error by routing to unkown route
   *
   * @param eventid
   *     The event id
   */
  getUnknownEvent(eventid: string): void {
    this.router.navigate(['unknown'], { skipLocationChange: true });
  }

  /**
   * Update event to be shown, even if it has been deleted
   * Used by #getEvent when a 409 Conflict (event deleted) response is received
   *
   * @param eventid
   *     the event id
   */
  private getDeletedEvent(eventid: string): void {
    const url = `${environment.DELETED_EVENT_SERVICE}&eventid=${eventid}`;

    this.http
      .get<any>(url)
      .pipe(catchError(this.handleError(eventid)))
      .subscribe(response => {
        this.setEvent(new Event(response));
      });
  }

  /**
   * Handle the error and build an error response object
   *
   * @param eventid
   *     the event id being requested added to the resulting error object
   * @returns {any}
   *     Object with request status properties
   */
  private handleError(eventid: string) {
    return (error: HttpErrorResponse): Observable<any> => {
      return of({
        id: eventid,
        message: error.message,
        status: error.status,
        type: 'Error'
      });
    };
  }

  /**
   * Function to check if the product has scenario substring, used for
   * instantiating a ScenarioEvent vs. an Event class
   * @param event
   *      The event response object
   * @returns
   *      If the event has a scenario type product
   */
  private isScenarioEvent(event: Event): boolean {
    let hasScenario = false;
    // ensure we have products
    if (event && event.properties && event.properties.products) {
      // Use some to short circuit the loop if any of the products
      // are scenario products, so we don't continue to iterate
      Object.keys(event.properties.products).some(key => {
        const product = event.properties.products[key];
        if (product[0].type.includes('scenario')) {
          hasScenario = true;
          return true;
        }
      });
    }
    return hasScenario;
  }

  /**
   * Update event observable, and call #updateProduct
   *
   * @param event
   *     The event object
   */
  private setEvent(event: any): void {
    this.event$.next(event);
    this.updateProduct();
  }

  /**
   * Update selected product
   *
   * @return whether a product was found
   */
  private updateProduct(): void {
    const event = this.event$.value;
    const product = event.getProduct(
      this.productType,
      this.productSource,
      this.productCode
    );
    event.product = product;
    this.product$.next(product);
  }
}
