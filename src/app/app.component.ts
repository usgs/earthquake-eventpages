import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Subscription } from 'rxjs';

import { ContributorService } from '@core/contributor.service';
import { EventService } from '@core/event.service';

import { Event } from './event';
import { EventTitlePipe } from './shared/event-title.pipe';

@Component({
  selector: 'app-root',
  styleUrls: ['./app.component.css'],
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit, OnDestroy {
  eventTitlePipe = new EventTitlePipe();
  subscription: Subscription;

  constructor(
    public contributorService: ContributorService,
    public eventService: EventService,
    public titleService: Title
  ) {}

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  ngOnInit() {
    this.contributorService.getContributors();
    this.subscription = this.eventService.event$.subscribe(
      this.onEvent.bind(this)
    );
  }

  onEvent(event: Event) {
    if (!event) {
      this.titleService.setTitle('Unknown Event');
    } else {
      this.titleService.setTitle(this.eventTitlePipe.transform(event));
    }
  }
}
