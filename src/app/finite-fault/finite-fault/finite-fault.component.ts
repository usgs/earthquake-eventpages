import { Component } from '@angular/core';

import { EventService } from '@core/event.service';

/**
 * Display finite-fault product information
 */
@Component({
  selector: 'finite-fault',
  styleUrls: ['./finite-fault.component.scss'],
  templateUrl: './finite-fault.component.html'
})
export class FiniteFaultComponent {
  constructor(public eventService: EventService) {}
}
