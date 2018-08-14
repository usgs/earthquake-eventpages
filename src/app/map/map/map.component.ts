import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { EventService } from '@core/event.service';

/**
 * Display interactive map page
 */
@Component({
  selector: 'map',
  styleUrls: ['./map.component.scss'],
  templateUrl: './map.component.html'
})
export class MapComponent {
  constructor(
    public activatedRoute: ActivatedRoute,
    public eventService: EventService
  ) {}
}
