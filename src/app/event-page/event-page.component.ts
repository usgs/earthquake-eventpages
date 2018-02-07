import { Component, OnInit, OnDestroy } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { EventService } from '../event.service';

@Component({
  selector: 'app-event-page',
  templateUrl: './event-page.component.html',
  styleUrls: ['./event-page.component.css']
})
export class EventPageComponent implements OnInit, OnDestroy {

  public event$: Observable<any>;

  constructor (
    public service: EventService,
  ) {}

  ngOnInit() {
  }

  ngOnDestroy() {
  }

}
