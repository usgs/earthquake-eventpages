import { Component, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { EventService } from '@core/event.service';

/**
 * Display interactive map page
 */
@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'map',
  styleUrls: ['./map.component.scss'],
  templateUrl: './map.component.html'
})
export class MapComponent {
  constructor(
    public activatedRoute: ActivatedRoute,
    public eventService: EventService
  ) {}

  onClick() {
    // TODO check if back will take you off of earthquake.usgs.gov
    window.history.back();
  }
}
