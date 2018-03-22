import { Component } from '@angular/core';

import { EventService } from '../../core/event.service';

@Component({
  selector: 'focal-mechanism',
  templateUrl: './focal-mechanism.component.html',
  styleUrls: ['./focal-mechanism.component.scss']
})
export class FocalMechanismComponent {

  constructor (
    public eventService: EventService
  ) { }

}
