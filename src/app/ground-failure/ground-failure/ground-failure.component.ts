import { Component } from '@angular/core';

import { EventService } from '../../core/event.service';


@Component({
  selector: 'ground-failure',
  templateUrl: './ground-failure.component.html',
  styleUrls: ['./ground-failure.component.scss']
})
export class GroundFailureComponent {

  constructor (
    public eventService: EventService
  ) { }

}
