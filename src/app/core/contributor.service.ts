import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable ,  of ,  BehaviorSubject } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { environment } from '../../environments/environment';


/**
 * Service to call http get request and get contributors data
 */
@Injectable()
export class ContributorService {

  public contributors$ = new BehaviorSubject<any>(null);

  constructor (
    private http: HttpClient
  ) { }


  /**
   * Makes call to get contributors from the environment variable
   */
  getContributors (): void {
    const url = environment.CONTRIBUTOR_SERVICE;

    this.http.get<any>(url).pipe(
      catchError(this.handleError('getContributors', []))
    ).subscribe((response) => {
      this.contributors$.next(response);
    });
  }

  /**
   *Error handler method to parse request inside pipe
   *
   * @param action
   *     The action that occured
   * @param result
   *     The result of specified action
   * @returns {any}
   *     Observable with error data
   */
  private handleError<T> (action: string, result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}
