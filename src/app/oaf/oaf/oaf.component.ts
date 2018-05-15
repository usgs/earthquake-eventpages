import { AfterViewInit, Component, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs/Subscription';

import { EventService } from '../../core/event.service';
import { OafService } from '../oaf.service';


@Component({
  selector: 'oaf',
  templateUrl: './oaf.component.html',
  styleUrls: ['./oaf.component.scss']
})
export class OafComponent implements AfterViewInit, OnDestroy {

  private subscription: Subscription = new Subscription();

  constructor (
    public eventService: EventService,
    public oafService: OafService
  ) { }

  ngAfterViewInit () {
    this.subscription.add(this.eventService.product$.subscribe((product) => {
      return this.onProduct(product);
    }));
  }

  ngOnDestroy () {
    this.subscription.unsubscribe();
  }

  onProduct (product: any): void {
    if (product && product.type === 'oaf') {
      this.oafService.getOaf(product);
    }
  }

}
