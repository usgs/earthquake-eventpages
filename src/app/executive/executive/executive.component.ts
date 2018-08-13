import { Component, ViewEncapsulation } from '@angular/core';


import { EventService } from '../../core/event.service';

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
  constructor(public eventService: EventService) {}
}
