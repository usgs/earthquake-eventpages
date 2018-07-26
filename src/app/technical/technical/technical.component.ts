import { Component } from '@angular/core';

import { EventService } from '../../core/event.service';


/**
 * Main technical component
 */
@Component({
  selector: 'technical',
  templateUrl: './technical.component.html',
  styleUrls: ['./technical.component.scss']
})
export class TechnicalComponent {


  constructor (public eventService: EventService) { }

}
