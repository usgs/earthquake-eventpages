import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { ContributorService } from '../../contributor.service';
import { EventService } from '../../event.service';
import { ProductService } from '../../product.service';

@Component({
  selector: 'product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css']
})
export class ProductPageComponent implements OnInit, OnDestroy {

  // page title
  @Input() pageTitle: string;

  // source of product information
  @Input() productService: ProductService;

  // type of product to be shown
  @Input() productType: string;

  // route parameters to select product
  private queryParamMapSubscription: Subscription;

  constructor(
    public contributorService: ContributorService,
    public route: ActivatedRoute,
    public router: Router
  ) { }

  ngOnInit() {
    this.queryParamMapSubscription = this.route.queryParamMap.subscribe((paramMap: ParamMap) => {
      this.onQueryParamMapChange(paramMap);
    });
  }
  ngOnDestroy () {
    this.queryParamMapSubscription.unsubscribe();
  }

  /**
   * Listen to route query parameters, to display specific source/code.
   *
   * If a specific source/code does not match a product, redirect to
   * @param paramMap query string parameters
   */
  onQueryParamMapChange(paramMap: ParamMap) {
    const source = paramMap.get('source');
    const code = paramMap.get('code');
    this.productService.setProduct(this.productType, source, code);
  }

}
