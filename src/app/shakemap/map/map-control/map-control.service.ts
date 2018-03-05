import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs/ReplaySubject';

@Injectable()
export class MapControlService {
  public addOverlay_ = new ReplaySubject(1);
  public clear_ = new ReplaySubject(1);

  constructor() { }

  addOverlay(layer) {
    this.addOverlay_.next(layer);
  }

  clear() {
    this.clear_.next(true);
  }
}