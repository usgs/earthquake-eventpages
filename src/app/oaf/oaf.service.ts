import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';


@Injectable()
export class OafService {

  public oaf$: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  public model$: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor () { }

  getOaf (product: any): void {
    try {
      const bytes = product.contents[''].bytes;
      const oaf = this.parseOaf(bytes);
      const model = this.parseModel(oaf.model);

      this.oaf$.next(oaf);
      this.model$.next(model);
    } catch (e) {
      this.oaf$.next(null);
      this.model$.next(null);
    }
  }

  parseModel (model: any): any {
    return {
      ref: model.ref,
      name: model.name,
      parameters: {
        keys: Object.keys(model.parameters),
        values: model.parameters
      }
    };
  }

  parseOaf (bytes: any): any {
    return JSON.parse(bytes);
  }
}
