import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, tap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';


@Injectable()
export class EventService implements OnDestroy, OnInit {
  public readonly API_URL = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/detail/{{EVENTID}}.geojson'

  private event: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  public readonly event$: Observable<any> = this.event.asObservable();

  constructor (
    private http: HttpClient
  ) {}

  ngOnInit() {
  }

  ngOnDestroy() {
  }

  getEvent (eventid: string): Observable<any> {
    console.log('get event ' + eventid);
    return of({});
  }

/*
  buildUrl (eventid: string) {
    return this.API_URL.replace('{{EVENTID}}', eventid);
  }

  empty ():void {
    this._event.next(null);
  }

  getEvent (eventid: string) {
    const url = this.buildUrl(eventid);

    // make a geocode request
    this.http.get<any>(url).pipe(
      catchError(this.handleError('getEvent', null))
    ).subscribe((response) => {
      this._event.next(response);
    });
  }

  handleError<T> (action: string, result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
*/

}
