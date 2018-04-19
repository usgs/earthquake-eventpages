import { Component, OnInit, Input } from '@angular/core';

import { Subscription } from 'rxjs/Subscription';

import { Event } from '../../event';
import { EventService } from '../../core/event.service';

@Component({
  selector: 'shakemap-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  public event: Event;
  public enableOverlay_: string = null;
  public queryParams: any = {};
  public shakemap: any;
  private subscription = new Subscription;

  constructor (public eventService: EventService) { }

  ngOnInit () {
    this.subscription.add(this.eventService.event$.subscribe((event) => {
      if (!event) {
        return;
      }

      this.event = event;
      this.shakemap = event.getProduct('shakemap');

      if (!this.shakemap) {
        return;
      }

      this.queryParams['shakemap-code'] = this.shakemap.code;
      this.queryParams['shakemap-source'] = this.shakemap.source;
    }));
  }

  @Input() set enableOverlay(enabled: string) {
    this.queryParams[enabled] = true;
    this.enableOverlay_ = enabled;
  }

  get enableOverlay() {
    return this.enableOverlay_;
  }

}
