import { Component } from '@angular/core';

import { EventService } from '../../core/event.service';

@Component({
  selector: 'shakemap-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent {

  constructor (public eventService: EventService) { }

}
