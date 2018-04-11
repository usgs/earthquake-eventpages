import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { EventService } from '../../core/event.service';
import { PagerXmlService } from '../pagerxml.service';


@Component({
  selector: 'pager-pager',
  templateUrl: './pager.component.html',
  styleUrls: ['./pager.component.scss']
})
export class PagerComponent implements OnInit {

  /** subscription to product observable */
  private productSubscription: Subscription;

  /** subscription to pager xml observable */
  private pagerXmlSubscription: Subscription;

  constructor(
    public eventService: EventService,
    public pagerXmlService: PagerXmlService
  ) { }

  ngOnInit() {
    this.productSubscription = this.eventService.product$.subscribe((product) => {
      this.onProduct(product);
    });
  }

  /**
   * Observe selected product, request pager.xml
   *
   * @param product next product.
   */
  onProduct (product) {
    if (product) {
      this.pagerXmlService.getPagerXml(product);
    }
  }
}
