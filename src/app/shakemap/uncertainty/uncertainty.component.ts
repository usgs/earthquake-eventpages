import { Component, OnInit, OnDestroy } from '@angular/core';
import { EventService } from '../../core/event.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-uncertainty',
  templateUrl: './uncertainty.component.html',
  styleUrls: ['./uncertainty.component.scss']
})
export class UncertaintyComponent implements OnInit, OnDestroy {
  public imageUrl: string = null;
  public subs = new Subscription();

  constructor (private eventService: EventService) { }

  ngOnInit () {
    this.subs.add(this.eventService.product$.subscribe((product) => {
      this.onProduct(product);
    }));
  }

  /**
   * New product, get new image url
   *
   * @param product shakemap product
   */
  onProduct (product) {
    if (product == null ||
          !product.contents['download/urat_pga.jpg']) {
      this.imageUrl = null;
      return;
    }

    const image = product.contents['download/urat_pga.jpg'];
    this.imageUrl = image.url;
  }

  ngOnDestroy () {
    this.subs.unsubscribe();
  }
}
