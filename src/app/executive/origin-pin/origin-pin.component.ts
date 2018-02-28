import { Component, Input, OnChanges } from '@angular/core';
import { RouterLink } from '@angular/router';

import { Subscription } from 'rxjs/Subscription';

import { EventService } from '../../event.service';
import { FormatterService } from '../../formatter.service';

import { Event } from '../../event';

@Component({
  selector: 'origin-pin',
  templateUrl: './origin-pin.component.html',
  styleUrls: ['./origin-pin.component.scss']
})
export class OriginPinComponent implements OnChanges {
  @Input() contributors: any;
  @Input() event: Event;

  product: any;
  title = 'Origin';

  constructor(
    public eventService: EventService,
    public formatterService: FormatterService
  ) { }

  ngOnChanges() {
    this.product = this.event.getProduct('origin');
  }
}
