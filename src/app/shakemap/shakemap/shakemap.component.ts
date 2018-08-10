import { Component } from '@angular/core';

import { EventService } from '../../core/event.service';


/**
 * Main shakemap component which shows a list of tabs for all it's
 * sub-components
 */
@Component({
  selector: 'app-shakemap',
  templateUrl: './shakemap.component.html',
  styleUrls: ['./shakemap.component.scss']
})
export class ShakemapComponent {

  constructor (public eventService: EventService) { }

}
