import { Component, OnInit } from '@angular/core';

import { EventService } from '@core/event.service';

@Component({
  selector: 'shake-alert',
  styleUrls: ['./shake-alert.component.scss'],
  templateUrl: './shake-alert.component.html'
})
export class ShakeAlertComponent implements OnInit {
  constructor(public eventService: EventService) {}

  ngOnInit() {}
}
