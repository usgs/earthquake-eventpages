import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { EventService } from '../../core/event.service';
import { PagerXmlService } from '../pagerxml.service';


@Component({
  selector: 'pager-pager',
  templateUrl: './pager.component.html',
  styleUrls: ['./pager.component.scss']
})
export class PagerComponent implements AfterViewInit, OnDestroy {

  /** subscription to product observable */
  private productSubscription: Subscription;

  constructor(
    public eventService: EventService,
    public pagerXmlService: PagerXmlService
  ) { }

  ngAfterViewInit() {
    // By the time the afterViewinit hook runs the eventService has
    // the correct "losspager" product
    this.productSubscription = this.eventService.product$.subscribe((product) => {
      this.onProduct(product);
    });
  }

  ngOnDestroy () {
    this.productSubscription.unsubscribe();
  }

  /**
   * Observe selected product, request pager.xml
   *
   * @param product next product.
   */
  onProduct (product) {
    if (product && product.type === 'losspager') {
      this.pagerXmlService.getPagerXml(product);
    }
  }
}
