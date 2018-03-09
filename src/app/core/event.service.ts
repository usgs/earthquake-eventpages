import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, tap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { Event } from '../event';

import { environment } from '../../environments/environment';

@Injectable()
export class EventService {

  // currently selected event
  private event = new BehaviorSubject<Event>(new Event(null));

  // Observable event
  public readonly event$: Observable<Event> = this.event.asObservable();

  // id information for product to be shown.
  private productType: string;
  private productSource: string;
  private productCode: string;

  private product = new BehaviorSubject<any>(null);
  public readonly product$: Observable<any> = this.product.asObservable();

  constructor (
    private http: HttpClient
  ) { }

  /**
   * Update event to be shown.
   *
   * @param eventid the event id.
   */
  getEvent (eventid: string): void {
    const url = `${environment.EVENT_SERVICE}/${eventid}.geojson`;

    // clear existing information if requested event id is different
    // otherwise let browser caching determine whether to update
    if (this.event.getValue().id !== eventid) {
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
   * Update product to be shown.
   *
   * @param type type of product.
   * @param source source of product.
   *               optional, defaults to preferred source.
   * @param code code of product.
   *               optional, defaults to preferred code.
   */
  getProduct(type: string, source?: string, code?: string): void {
    this.productType = type;
    this.productSource = source;
    this.productCode = code;

    this.updateProduct();
  }

  /**
   * Update event to be shown, even if it has been deleted.
   *
   * Used by #getEvent when a 409 Conflict (event deleted) response is received.
   *
   * @param eventid the event id.
   * @see this.event$
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
   * Error handler for http requests.
   *
   * @param eventid the event id being requested.
   *                added to the resulting error object.
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
   * Update event observable, and call #updateProduct.
   *
   * @param event
   */
  private setEvent(event: any): void {
    this.event.next(event);
    this.updateProduct();
  }

  /**
   * Update selected product.
   *
   * @return whether a product was found.
   */
  private updateProduct(): void {
    const event = this.event.getValue();
    const product = event.getProduct(
      this.productType,
      this.productSource,
      this.productCode
    );
    event.product = product;
    this.product.next(product);
  }

}
