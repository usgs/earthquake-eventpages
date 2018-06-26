import { Component } from '@angular/core';

import { EventService } from '../../core/event.service';

@Component({
  selector: 'app-finite-fault',
  templateUrl: './finite-fault.component.html',
  styleUrls: ['./finite-fault.component.scss']
})
export class FiniteFaultComponent {

  constructor(
    public eventService: EventService
  ) { }

}
