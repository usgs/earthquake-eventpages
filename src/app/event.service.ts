import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, tap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { HttpErrorResponse } from '@angular/common/http/src/response';


@Injectable()
export class EventService implements OnDestroy, OnInit {
  public readonly API_URL = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/detail/{{EVENTID}}.geojson'

  private event: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  public readonly event$: Observable<any> = this.event.asObservable();

  constructor (
    private http: HttpClient
  ) { }

  ngOnInit () {
  }

  ngOnDestroy () {
  }

  empty (): void {
    this.event.next(null);
  }

  getDeletedEvent (eventid: string): void {
    let url = `https://earthquake.usgs.gov/fdsnws/event/1/query.geojson?eventid=${eventid}&includedeleted=true`;

    this.http.get<any>(url).pipe(
      catchError(this.handleError(eventid))
    ).subscribe((response) => {
      console.log('EventDetails', response);
      this.event.next(response);
    });
  }

  getEvent (eventid: string): void {
    let url = `https://earthquake.usgs.gov/earthquakes/feed/v1.0/detail/${eventid}.geojson`;

    this.http.get<HttpResponse<any>>(url).pipe(
      catchError(this.handleError(eventid))
    ).subscribe((response) => {
      if (response['type'] === 'Error' && response['status'] === 409) {
        this.getDeletedEvent(eventid);
        return;
      }
      this.event.next(response);
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
