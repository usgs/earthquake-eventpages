import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators/catchError';
import { of } from 'rxjs/observable/of';

@Injectable()
export class MetadataService {
  public error: any = null;
  public metadata: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(private httpClient: HttpClient) { }

  /**
   * Retreive metadata for a specifc shakemap
   *
   * @param product shakemap product json
   */
  getMetadata (product: any): void {
    if (product == null) {
      this.metadata.next(null);
      return;
    }
    const metadata = product.contents['download/info.json'];

    this.httpClient.get(metadata.url).pipe(
      catchError(this.handleError())
    ).subscribe((metadata) => {
      this.handleMetadata(metadata);
    }, (e) => {
      /*  Subscribe errored */
      this.error = e;
      this.metadata.next(null);
    });
  }

  /**
   * Handle new instances of metadata
   *
   * @param metadata json object
   */
  handleMetadata(metadata) {
    metadata = this.translate(metadata);
    this.metadata.next(metadata);
  }

  /**
   * Translate old metadata
   *
   * @param metadata object
   */
  translate(metadata) {
    // Which objects are not arrays in ShakeMap V3
    let needsTrans = {'output': ['ground_motions', 'map_information'],
                        'processing': ['ground_motion_modules', 'roi']}

    for (let dataType in needsTrans) {
      for (let each of needsTrans[dataType]) {
        // Convert non-array objects
        if (metadata &&
              metadata[dataType] && 
              metadata[dataType][each] &&
              (!(metadata[dataType][each] instanceof Array))) {

          metadata[dataType][each] = this.obj2Arr(metadata[dataType][each]);

        }
      }
    }

    return metadata;
  }

  /**
   * Convert metadata objects to arrays by
   * assigning their key as a 'type' property
   *
   * @param obj javascript object
   */
  obj2Arr(obj) {
    let arr = [];
    for (let item_id in obj) {
      let item = obj[item_id];
      item['type'] = item_id;

      arr.push(item);
    }
    return arr;
  }

  /**
   * Error handler for http requests.
   */
  private handleError () {
    return (error: HttpErrorResponse): Observable<any> => {
      this.error = error;
      return of(null);
    };
  }
}
