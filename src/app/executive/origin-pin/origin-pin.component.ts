import { Component, OnInit } from '@angular/core';

import { Subscription } from 'rxjs/Subscription';

import { DateTimePipe } from '../../product-page/date-time.pipe';
import { EventService } from '../../event.service';
import { Event } from '../../event';

@Component({
  selector: 'app-origin-pin',
  templateUrl: './origin-pin.component.html',
  styleUrls: ['./origin-pin.component.css']
})
export class OriginPinComponent implements OnInit {
  title: string = 'Title';
  content: string = 'Content ...';
  actions: string = 'Press Me';
  footer: string = 'Footer';
  product: any;

  // keep track of event subscription
  private eventServiceSubscription: Subscription;

  constructor(
    public eventService: EventService
  ) { }

  ngOnInit () {
    this.eventServiceSubscription = this.eventService.event$.subscribe(
        (event: Event) => {
      this.product = event.getProduct('origin');
    });
  }

  ngOnDestroy () {
    this.eventServiceSubscription.unsubscribe();
  }

  toJson (data: any): string {
    return JSON.stringify(data, null, 2);
  }
}
