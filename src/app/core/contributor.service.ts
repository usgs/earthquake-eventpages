import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { catchError } from 'rxjs/operators';
import { Subscription } from 'rxjs/Subscription';

import { environment } from '../../environments/environment';

@Injectable()
export class ContributorService {
  private contributors = new BehaviorSubject<any>(null);
  public readonly contributors$ = this.contributors.asObservable();

  constructor (
    private http: HttpClient
  ) { }


  getContributors () {
    const url = environment.CONTRIBUTOR_SERVICE;

    this.http.get<any>(url).pipe(
      catchError(this.handleError('getContributors', []))
    ).subscribe((response) => {
      this.contributors.next(response);
    });
  }


  private handleError<T> (action: string, result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}
