import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  OnDestroy
} from '@angular/core';

import { Subscription } from 'rxjs';

import { ContentsXmlService } from '@core/contents-xml.service';
import { EventService } from '@core/event.service';

/**
 * Generates expansion panel to list all downloadable product contents
 *
 * @param product {Product}
 *    The product to download
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'product-page-download',
  styleUrls: ['./download.component.scss'],
  templateUrl: './download.component.html'
})
export class DownloadComponent implements OnInit, OnDestroy {
  @Input()
  expanded: any;

  @Input()
  product: any;

  subscription: Subscription;

  constructor(
    public contentsXmlService: ContentsXmlService,
    public eventService: EventService
  ) {}

  /**
   * Gets contents xml from product
   */
  loadContentsXml() {
    if (this.product && this.product.phasedata) {
      // prefer phase data when availble
      this.product = this.product.phasedata;
    }
    this.contentsXmlService.get(this.product);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  ngOnInit() {
    this.subscription = this.eventService.product$.subscribe(product => {
      this.product = product;
      this.loadContentsXml();
    });
  }

  /**
   * Checks for changes to data by index
   *
   * @param index
   *    index of array
   * @param item
   *    content item
   */
  trackByIndex(index, item) {
    return index;
  }
}
