import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs';

import { EventService } from '../../core/event.service';
import { Event } from '../../event';
import { Tensor } from '../../shared/beachball/tensor';


/**
 * Executive summary page
 */
@Component({
  selector: 'app-executive',
  templateUrl: './executive.component.html',
  styleUrls: ['./executive.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ExecutiveComponent {

  constructor (
    public eventService: EventService
  ) { }

}
