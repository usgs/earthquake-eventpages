import { Component } from '@angular/core';

import { EventService } from '../../event.service';


@Component({
  selector: 'origin',
  templateUrl: './origin.component.html',
  styleUrls: ['./origin.component.css']
})
export class OriginComponent {

  constructor(
    public eventService: EventService
  ) { }

}
