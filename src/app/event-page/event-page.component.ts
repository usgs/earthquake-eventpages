import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { EventService } from '../event.service';


@Component({
  selector: 'app-event-page',
  templateUrl: './event-page.component.html',
  styleUrls: ['./event-page.component.css']
})
export class EventPageComponent implements OnInit, OnDestroy {

  public event$: Observable<any>;
  private paramMapSubscription: Subscription;

  constructor (
    public route: ActivatedRoute,
    public eventService: EventService,
  ) {}

  ngOnInit() {
    console.log('EventPageComponent::ngOnInit');
    this.paramMapSubscription = this.route.paramMap.subscribe(this.onParamMapChange);
    this.eventSubscription = this.eventService.event$.subscribe(this.onEvent);
  }

  ngOnDestroy() {
    this.paramMapSubscription.unsubscribe();
  }

  onParamMapChange (paramMap: any) {
    this.eventService.getEvent(paramMap.get('eventid'));
  }

  onEventChange (event: any) {
    this.event
  }
}
