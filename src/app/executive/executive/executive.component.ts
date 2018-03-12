import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';

import { EventService } from '../../core/event.service';
import { Event } from '../../event';
import { Tensor } from '../../shared/beachball/tensor';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-executive',
  templateUrl: './executive.component.html',
  styleUrls: ['./executive.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ExecutiveComponent implements OnInit, OnDestroy {

  private eventSubscription: Subscription;

  public event: Event = null;
  public momentTensor: any = null;

  constructor (
    public eventService: EventService
  ) { }

  ngOnInit () {
    this.eventSubscription = this.eventService.event$.subscribe((event) => {
      this.onEvent(event);
    });
  }

  ngOnDestroy () {
    this.eventSubscription.unsubscribe();
  }

  onEvent (event: Event) {
    this.event = event;

    if (!event) {
      // clear data and return
      this.momentTensor = null;
      return;
    }

    // products to be displayed
    this.momentTensor = event.getProduct('moment-tensor');
  }
}
