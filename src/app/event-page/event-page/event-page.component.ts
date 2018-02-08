import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { Subscription } from 'rxjs/Subscription';

import { EventService } from '../../event.service';


@Component({
  selector: 'app-event-page',
  templateUrl: './event-page.component.html',
  styleUrls: ['./event-page.component.css']
})
export class EventPageComponent implements OnInit, OnDestroy {

  private paramMapSubscription: Subscription;

  constructor (
    public route: ActivatedRoute,
    public eventService: EventService,
  ) { }

  ngOnInit () {
    this.paramMapSubscription = this.route.paramMap.subscribe((paramMap: ParamMap) => {
      return this.onParamMapChange(paramMap);
    });
  }

  ngOnDestroy () {
    this.paramMapSubscription.unsubscribe();
  }

  onParamMapChange (paramMap: any) {
    this.eventService.getEvent(paramMap.get('eventid'));
  }

  formatEventTitle (event: any) {
    return event.id;
  }

  asJson (event: any) {
    return JSON.stringify(event, null, 2);
  }
}
