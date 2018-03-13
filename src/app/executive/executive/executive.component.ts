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

  public generalHeaders: Array<any> = [];
  public generalLinks: Array<any> = [];
  public generalTexts: Array<any> = [];

  public momentTensor: any = null;
  public origin: any = null;


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
      this.origin = null;
      return;
    }

    // products to be displayed
    this.generalHeaders = event.getProducts('general-header');
    this.generalLinks = event.getProducts('general-link');
    this.generalTexts = event.getProducts('general-text');
    this.momentTensor = event.getProduct('moment-tensor');
    this.origin = event.getProduct('origin');
  }

}
