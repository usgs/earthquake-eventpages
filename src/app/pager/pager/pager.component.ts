import {
  AfterViewInit,
  Component,
  OnDestroy,
  ViewEncapsulation
} from '@angular/core';

import { Subscription } from 'rxjs';

import { EventService } from '../../core/event.service';
import { PagerXmlService } from '../pagerxml.service';

/**
 * Pager component to display losspager product information
 *
 */
@Component({
  selector: 'pager-pager',
  templateUrl: './pager.component.html',
  styleUrls: ['./pager.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PagerComponent implements AfterViewInit, OnDestroy {
  /** subscription to product observable */
  public subscription: Subscription = new Subscription();

  constructor(
    public eventService: EventService,
    public pagerXmlService: PagerXmlService
  ) {}

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
  }
}
