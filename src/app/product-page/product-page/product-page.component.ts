import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

import { BehaviorSubject, Observable, Subscription } from 'rxjs';

import { ContributorService } from '../../core/contributor.service';
import { EventService } from '../../core/event.service';

/**
 * Product page grabs the product from the event object and
 * generates the scaffolding for the product specfic page.
 *
 * @param productType {string}
 *    The type of product to display
 */
@Component({
  selector: 'product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss']
})
export class ProductPageComponent implements OnInit, OnDestroy {

  // query params can override default product source/code to be shown
  public queryParamMapSubscription: Subscription;

  @Input() productType: string;


  constructor (
    public contributorService: ContributorService,
    public eventService: EventService,
    public route: ActivatedRoute
  ) { }


  ngOnDestroy() {
    this.queryParamMapSubscription.unsubscribe();
  }

  ngOnInit () {
    this.queryParamMapSubscription =
        this.route.queryParamMap.subscribe((paramMap: ParamMap) => {
      this.onQueryParamMapChange(paramMap);
    });
  }

  /**
   * Parses the url to extract the event source and event source code
   * and fetches the correct product (from the event) based on:
   * type, source (optional), code (optional)
   *
   * @param paramMap {ParamMap}
   *    map of url parameters
   */
  onQueryParamMapChange (paramMap: ParamMap) {
    const source = paramMap.get('source');
    const code = paramMap.get('code');
    this.eventService.getProduct(this.productType, source, code);
  }
}
