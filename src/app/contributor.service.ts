import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { catchError } from 'rxjs/operators';
import { Subscription } from 'rxjs/Subscription';

@Injectable()
export class ContributorService {
  private contributors = new BehaviorSubject<any>(null);
  public readonly contributors$ = this.contributors.asObservable();
  private contributorsSubscription: Subscription;

  private list: any = null;

  constructor (
    private http: HttpClient
  ) { }


  getContributors () {
    const url = 'https://earthquake.usgs.gov/data/comcat/contributor/index.json.php';

    this.http.get<any>(url).pipe(
      catchError(this.handleError('getContributors', []))
    ).subscribe((response) => {
      console.log('Contributors', response);
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
