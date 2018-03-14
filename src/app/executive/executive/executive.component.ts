import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';

import { EventService } from '../../core/event.service';
import { Event } from '../../event';
import { Tensor } from '../../shared/beachball/tensor';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-executive',
  templateUrl: './executive.component.html',
  styleUrls: ['./executive.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ExecutiveComponent implements OnInit {

  constructor (
    public eventService: EventService
  ) { }

  ngOnInit () {
  }

}
