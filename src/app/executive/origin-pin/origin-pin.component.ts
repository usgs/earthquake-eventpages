import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

import { Subscription } from 'rxjs/Subscription';

import { EventService } from '../../event.service';
import { FormatterService } from '../../formatter.service';

import { Event } from '../../event';

@Component({
  selector: 'app-origin-pin',
  templateUrl: './origin-pin.component.html',
  styleUrls: ['./origin-pin.component.scss']
})
export class OriginPinComponent implements OnDestroy, OnInit {
  @Input() contributors: any;
  @Input() event: any;

  title = 'Origin';
  product: any;

  // keep track of event subscription
  private eventServiceSubscription: Subscription;

  constructor(
    public eventService: EventService,
    public formatterService: FormatterService
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
}
