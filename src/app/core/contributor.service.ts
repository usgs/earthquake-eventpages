import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BehaviorSubject, Observable, of, Subscription } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { environment } from '../../environments/environment';

@Injectable()
export class ContributorService {
  public contributors$ = new BehaviorSubject<any>(null);

  constructor (
    private http: HttpClient
  ) { }


  getContributors () {
    const url = environment.CONTRIBUTOR_SERVICE;

    this.http.get<any>(url).pipe(
      catchError(this.handleError('getContributors', []))
    ).subscribe((response) => {
      this.contributors$.next(response);
    });
  }


  private handleError<T> (action: string, result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}
