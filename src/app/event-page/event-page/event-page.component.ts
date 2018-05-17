import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { Subscription } from 'rxjs';

import { ContributorService } from '../../core/contributor.service';
import { EventService } from '../../core/event.service';


@Component({
  selector: 'app-event-page',
  templateUrl: './event-page.component.html',
  styleUrls: ['./event-page.component.css']
})
export class EventPageComponent implements OnInit, OnDestroy {

  private paramMapSubscription: Subscription;

  constructor (
    public route: ActivatedRoute,
    public contributorService: ContributorService,
    public eventService: EventService
  ) { }

  ngOnInit () {
    this.paramMapSubscription = this.route.paramMap.subscribe((paramMap: ParamMap) => {
      return this.onParamMapChange(paramMap);
    });
  }

  ngOnDestroy () {
    this.paramMapSubscription.unsubscribe();
  }

  onParamMapChange (paramMap: ParamMap) {
    // request event
    this.eventService.getEvent(paramMap.get('eventid'));
  }

}
