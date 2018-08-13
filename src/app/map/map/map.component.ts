import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { EventService } from '../../core/event.service';

/**
 * Display interactive map page
 */
@Component({
  selector: 'map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent {
  constructor(
    public activatedRoute: ActivatedRoute,
    public eventService: EventService
  ) {}
}
