import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

import { BehaviorSubject, Observable, Subscription } from 'rxjs';

import { ContributorService } from '../../core/contributor.service';
import { EventService } from '../../core/event.service';

@Component({
  selector: 'product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css']
})
export class ProductPageComponent implements OnInit, OnDestroy {

  // type of product to be shown
  @Input() productType: string;

  // query params can override default product source/code to be shown
  private queryParamMapSubscription: Subscription;

  constructor (
    public contributorService: ContributorService,
    public eventService: EventService,
    public route: ActivatedRoute
  ) { }

  ngOnInit () {
    this.queryParamMapSubscription = this.route.queryParamMap.subscribe((paramMap: ParamMap) => {
      this.onQueryParamMapChange(paramMap);
    });
  }

  ngOnDestroy () {
    this.queryParamMapSubscription.unsubscribe();
  }

  onQueryParamMapChange (paramMap: ParamMap) {
    const source = paramMap.get('source');
    const code = paramMap.get('code');
    this.eventService.getProduct(this.productType, source, code);
  }

}
