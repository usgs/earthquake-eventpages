import {
  AfterViewInit,
  Component,
  OnDestroy,
  ViewEncapsulation
} from '@angular/core';

import { Subscription } from 'rxjs';

import { EventService } from '@core/event.service';
import { PagerXmlService } from '../pagerxml.service';

/**
 * Pager component to display losspager product information
 *
 */
@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'pager-pager',
  styleUrls: ['./pager.component.scss'],
  templateUrl: './pager.component.html'
})
export class PagerComponent implements AfterViewInit, OnDestroy {
  /** subscription to product observable */
  pending: boolean;
  subscription: Subscription = new Subscription();

  constructor(
    public eventService: EventService,
    public pagerXmlService: PagerXmlService
  ) {}

  /**
   * Check the product to see if it's 'alertlevel' property is pending or is
   *  a valid string color
   *
   * @param product
   *     The product to check
   * @returns
   *      Boolean value of pending status
   */
  isPending(product: any): boolean {
    if (product.properties.alertlevel.toLowerCase() === 'pending') {
      return true;
    } else {
      return false;
    }
  }

  ngAfterViewInit() {
    // By the time the afterViewinit hook runs the eventService has
    // the correct "losspager" product
    this.subscription.add(
      this.eventService.product$.subscribe(product => {
        this.onProduct(product);
      })
    );
  }

  ngOnDestroy() {
    // unsubscribe all subscriptions
    this.subscription.unsubscribe();
  }

  /**
   * Observe selected product, request pager.xml
   *
   * @param product
   *     a "losspager" product.
   */
  onProduct(product: any) {
    if (product && product.type === 'losspager') {
      this.pagerXmlService.getPagerXml(product);
    }
    if (product && product.properties) {
      if (product.properties.alertlevel) {
        this.pending = this.isPending(product);
      } else {
        this.pending = false;
      }
    }
  }
}
