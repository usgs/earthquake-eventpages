import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs';

import { EventService } from '@core/event.service';

/**
 * Shakemap uncertainty component, shows the uncertainty ratio map on the
 * uncertainty tab of the main shakemap component
 */
@Component({
  selector: 'shakemap-uncertainty',
  styleUrls: ['./uncertainty.component.scss'],
  templateUrl: './uncertainty.component.html'
})
export class UncertaintyComponent implements OnInit, OnDestroy {
  imageUrl: string = null;
  subscription = new Subscription();

  constructor(public eventService: EventService) {}

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  ngOnInit() {
    this.subscription.add(
      this.eventService.product$.subscribe(product => {
        this.onProduct(product);
      })
    );
  }

  /**
   * New product, get new image url
   *
   * @param product
   *     shakemap product
   */
  onProduct(product: any): void {
    if (product === null || !product.contents['download/urat_pga.jpg']) {
      this.imageUrl = null;
      return;
    }
    const image = product.contents['download/urat_pga.jpg'];
    this.imageUrl = image.url;
  }
}
