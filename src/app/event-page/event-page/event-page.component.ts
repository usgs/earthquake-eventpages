import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { Subscription } from 'rxjs';

import { ContributorService } from '../../core/contributor.service';
import { EventService } from '../../core/event.service';

/**
 * Main event page component, wraps inbound data components
 */
@Component({
  selector: 'app-event-page',
  templateUrl: './event-page.component.html',
  styleUrls: ['./event-page.component.scss']
})
export class EventPageComponent implements OnInit, OnDestroy {
  public subscription = new Subscription();

  constructor(
    public route: ActivatedRoute,
    public contributorService: ContributorService,
    public eventService: EventService
  ) {}

  ngOnInit() {
    this.subscription.add(
      this.route.paramMap.subscribe((paramMap: ParamMap) => {
        return this.onParamMapChange(paramMap);
      })
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  /**
   * When the query params change, get the new event id
   *
   * @param paramMap
   *     The url query parameters
   */
  onParamMapChange(paramMap: ParamMap): void {
    // request event
    this.eventService.getEvent(paramMap.get('eventid'));
  }
}
