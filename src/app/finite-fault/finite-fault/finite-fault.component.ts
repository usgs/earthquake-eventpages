import { Component } from '@angular/core';

import { EventService } from '../../core/event.service';


/**
 * Display finite-fault product information
 */
@Component({
  selector: 'finite-fault',
  templateUrl: './finite-fault.component.html',
  styleUrls: ['./finite-fault.component.scss']
})
export class FiniteFaultComponent {

  constructor(
    public eventService: EventService
  ) { }

}
