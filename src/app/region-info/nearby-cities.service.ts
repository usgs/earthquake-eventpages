import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Place } from 'hazdev-ng-geoserve-output';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NearbyCitiesService {
  cities$ = new BehaviorSubject<Place[]>(null);

  constructor(public http: HttpClient) { }

  get(product: any) {
    try {
      this.http.get(product.contents['nearby-cities.json'].url)
        .pipe(catchError(this.handleError(product)))
        .subscribe((response) => {
          const cities = response.map((feature) => {
            const name = feature.name.split(',');
            const admin1Name = name.splice(name.length - 1, 1);

            return {
              'admin1_name': admin1Name,
              'azimuth': feature.direction,
              'country_name': null,
              'distance': feature.distance,
              'name': name.join(','),
              'population': feature.population
            };
          });

          console.log('Ticking next with ' + cities);
          this.cities$.next(cities);
        });
    } catch (e) {
      this.cities$.next(null);
    }
  }

  private handleError(product: any) {
    return (error: HttpErrorResponse): Observable<any> => {
      return of([]);
    };
  }
}
