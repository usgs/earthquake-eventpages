import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { ContributorService } from '@core/contributor.service';
import { EventService } from '@core/event.service';

import { Event } from './event';
import { EventTitlePipe } from './shared/event-title.pipe';

@Component({
  selector: 'app-root',
  styleUrls: ['./app.component.css'],
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  eventTitlePipe = new EventTitlePipe();

  constructor(
    public contributorService: ContributorService,
    public eventService: EventService,
    public titleService: Title
  ) {}

  ngOnInit() {
    this.contributorService.getContributors();
    this.eventService.event$.subscribe(this.onEvent.bind(this));
  }

  onEvent(event: Event) {
    if (!event) {
      this.titleService.setTitle('Unknown Event');
    } else {
      this.titleService.setTitle(this.eventTitlePipe.transform(event));
    }
  }
}
