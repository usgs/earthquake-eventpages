import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, tap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { Event } from './event';

@Injectable()
export class EventService {
  private event: BehaviorSubject<Event> = new BehaviorSubject<Event>(new Event(null));

  public readonly event$: Observable<Event> = this.event.asObservable();

  constructor (
    private http: HttpClient
  ) { }

  empty (): void {
    this.event.next(new Event(null));
  }

  getDeletedEvent (eventid: string): void {
    const url = `https://earthquake.usgs.gov/fdsnws/event/1/query.geojson?eventid=${eventid}&includedeleted=true`;

    this.http.get<any>(url).pipe(
      catchError(this.handleError(eventid))
    ).subscribe((response) => {
      console.log('EventDetails', response);
      this.event.next(new Event(response));
    });
  }

  getEvent (eventid: string): void {
    const url = `https://earthquake.usgs.gov/earthquakes/feed/v1.0/detail/${eventid}.geojson`;

    this.http.get<HttpResponse<any>>(url).pipe(
      catchError(this.handleError(eventid))
    ).subscribe((response) => {
      if (response['type'] === 'Error' && response['status'] === 409) {
        this.getDeletedEvent(eventid);
        return;
      }
      this.event.next(new Event(response));
    });
  }

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

}