import {
  HttpClient,
  HttpErrorResponse,
  HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable ,  of ,  BehaviorSubject } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { Event } from '../event';


/**
 * Event service, gets event, updates products, makes http calls dealing with
 * the specific event
 */
@Injectable()
export class EventService {


  // currently selected event
  public event$ = new BehaviorSubject<Event>(new Event(null));
  // id information for product to be shown.
  public productType: string;
  public productSource: string;
  public productCode: string;
  public product$ = new BehaviorSubject<any>(null);


  constructor (private http: HttpClient) { }


  /**
   * Update event to be shown
   *
   * @param eventid
   *     the event id
   */
  getEvent (eventid: string): void {
    const url = `${environment.EVENT_SERVICE}/${eventid}.geojson`;

    // clear existing information if requested event id is different
    // otherwise let browser caching determine whether to update
    if (this.event$.value.id !== eventid) {
      this.setEvent(new Event(null));
    }

    // load new information
    this.http.get<HttpResponse<any>>(url).pipe(
      catchError(this.handleError(eventid))
    ).subscribe((response) => {
      if (response['type'] === 'Error' && response['status'] === 409) {
        this.getDeletedEvent(eventid);
        return;
      }
      this.setEvent(new Event(response));
    });
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
  getProduct (type: string, source?: string, code?: string): void {
    this.productType = type;
    this.productSource = source;
    this.productCode = code;

    this.updateProduct();
  }

  /**
   * Update event to be shown, even if it has been deleted
   * Used by #getEvent when a 409 Conflict (event deleted) response is received
   *
   * @param eventid
   *     the event id
   */
  private getDeletedEvent (eventid: string): void {
    const url = `${environment.DELETED_EVENT_SERVICE}&eventid=${eventid}`;

    this.http.get<any>(url).pipe(
      catchError(this.handleError(eventid))
    ).subscribe((response) => {
      this.setEvent(new Event(response));
    });
  }

  /**
   * Error handler for http requests
   *
   * @param eventid
   *     the event id being requested added to the resulting error object
   * @returns {any}
   *     Object with request status properties
   */
  private handleError (eventid: string) {
    return (error: HttpErrorResponse): Observable<any> => {
      return of({
        id: eventid,
        type: 'Error',
        message: error.message,
        status: error.status
      });
    };
  }

  /**
   * Update event observable, and call #updateProduct
   *
   * @param event
   *     The event object
   */
  private setEvent (event: any): void {
    this.event$.next(event);
    this.updateProduct();
  }

  /**
   * Update selected product
   *
   * @return whether a product was found
   */
  private updateProduct (): void {
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
