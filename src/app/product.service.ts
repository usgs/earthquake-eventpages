import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { EventService } from './event.service';

@Injectable()
export class ProductService {

  private product: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  public product$: Observable<any> = this.product.asObservable();

  public event: any;
  public type: string;
  public source: string;
  public code: string;

  /**
   * Return first matching product of given type.
   *
   * @param type type of product.
   * @param source source of product.
   * @param code code of product.
   */
  findProduct(type: string, source?: string, code?: string): any {
    let products;

    if (!type) {
      return;
    }

    try {
      products = this.event['properties']['products'][type];
    } catch (e) {
      return;
    }

    return products.find((product) => {
      if ((source && product.source !== source) ||
          (code && product.code !== code)) {
        return false;
      }
      return true;
    });
  }

  /**
   * Update source of event information.
   *
   * @param event
   */
  setEvent(event: any): boolean {
    this.event = event;

    return this.updateProduct();
  }

  /**
   * Update product to be shown.
   *
   * @param type type of product.
   * @param source source of product (optional).
   * @param code code of product (optional).
   */
  setProduct(type: string, source?:string, code?: string): boolean {
    this.type = type;
    this.source = source;
    this.code = code;

    return this.updateProduct();
  }

  /**
   * Find product and update BehaviorSubject.
   *
   * @return whether a product was found.
   */
  updateProduct(): boolean {
    const next = this.findProduct(this.type, this.source, this.code);
    this.product.next(next);
    return !!next;
  }
}
