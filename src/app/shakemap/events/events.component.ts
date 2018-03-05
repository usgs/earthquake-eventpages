import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { EventService } from './event.service';

@Component({
  selector: 'shakemap-view-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit, OnDestroy {
  public eventData: any = [];
  private subs: any[] = [];

  constructor(public eventService: EventService) { }

  ngOnInit() {
    this.subs.push(this.eventService.events.subscribe((data: any[]) => {
      this.eventData = data;

      if (data.length > 0) {
        this.plot(data[0])
      }
    }));
  }

  plot(event) {
    this.eventService.selectEvent(event);
  }

  ngOnDestroy() {
    for (let sub of this.subs) {
      sub.unsubscribe();
    }
  }
}
