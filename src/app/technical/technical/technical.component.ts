import { Component } from '@angular/core';

import { EventService } from '@core/event.service';


/**
 * Main technical component for focal mechanism, origin, moment tensor
 */
@Component({
  selector: 'technical',
  styleUrls: ['./technical.component.scss'],
  templateUrl: './technical.component.html'
})
export class TechnicalComponent {
  constructor(public eventService: EventService) {}

  trackByIndex (index, item) {
    console.log('index: ' + index);
    console.log(item);
    return index;
  }

}
