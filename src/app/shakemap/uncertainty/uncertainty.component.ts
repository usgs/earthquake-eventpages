import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs';

import { EventService } from '../../core/event.service';


/**
 * Shakemap uncertainty component, shows the uncertainty ratio map on the
 * uncertainty tab of the main shakemap component
 */
@Component({
  selector: 'shakemap-uncertainty',
  templateUrl: './uncertainty.component.html',
  styleUrls: ['./uncertainty.component.scss']
})
export class UncertaintyComponent implements OnInit, OnDestroy {


  public imageUrl: string = null;
  public subs = new Subscription();


  constructor (public eventService: EventService) { }


  ngOnInit () {
    this.subs.add(this.eventService.product$.subscribe((product) => {
      this.onProduct(product);
    }));
  }

  ngOnDestroy () {
    this.subs.unsubscribe();
  }

  /**
   * New product, get new image url
   * @param product
   *     shakemap product
   */
  onProduct (product: any) {
    if (product == null ||
          !product.contents['download/urat_pga.jpg']) {
      this.imageUrl = null;
      return;
    }
    const image = product.contents['download/urat_pga.jpg'];
    this.imageUrl = image.url;
  }

}
