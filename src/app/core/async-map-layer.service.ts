import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class AsyncMapLayerService {
  public asyncLayer$ = new BehaviorSubject(null);

  constructor(private http: HttpClient) { }

  generateLayer(Layer, url) {
    this.http.get(url).subscribe((data) => {
      const layer = new Layer(data);
      this.asyncLayer$.next(layer);
    })
  }


}
