import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { Subscription } from 'rxjs/Subscription';

import { ContributorService } from '../../contributor.service';
import { EventService } from '../../event.service';
import { ProductService } from '../../product.service';


@Component({
  selector: 'app-event-page',
  templateUrl: './event-page.component.html',
  styleUrls: ['./event-page.component.css']
})
export class EventPageComponent implements OnInit, OnDestroy {

  private eventSubscription: Subscription;
  private paramMapSubscription: Subscription;

  constructor (
    public route: ActivatedRoute,
    public contributorService: ContributorService,
    public eventService: EventService,
    public productService: ProductService
  ) { }

  ngOnInit () {
    this.eventSubscription = this.eventService.event$.subscribe((event: any) => {
      return this.onEventChange(event);
    });

    this.paramMapSubscription = this.route.paramMap.subscribe((paramMap: ParamMap) => {
      return this.onParamMapChange(paramMap);
    });
  }

  ngOnDestroy () {
    this.eventSubscription.unsubscribe();
    this.paramMapSubscription.unsubscribe();
  }

  onEventChange (event: any) {
    this.productService.setEvent(event);
  }

  onParamMapChange (paramMap: any) {
    this.eventService.getEvent(paramMap.get('eventid'));
  }

}
