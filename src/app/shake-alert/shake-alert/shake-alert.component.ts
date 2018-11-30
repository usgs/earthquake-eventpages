import { Component, OnDestroy, OnInit } from '@angular/core';

import { Subscription } from 'rxjs';

import { EventService } from '@core/event.service';
import { ShakeAlertService } from '../shake-alert.service';

@Component({
  selector: 'shake-alert',
  styleUrls: ['./shake-alert.component.scss'],
  templateUrl: './shake-alert.component.html'
})
export class ShakeAlertComponent implements OnDestroy, OnInit {
  subscription = new Subscription();

  constructor(
    public eventService: EventService,
    public shakeAlertService: ShakeAlertService
  ) {}

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
   * New product, get new shake-alert summary
   *
   * @param product
   *     shake-alert product
   */
  onProduct(product) {
    this.shakeAlertService.getSummary(product);
  }
}
