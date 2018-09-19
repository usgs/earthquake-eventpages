import { Component } from '@angular/core';
import { EventService } from '@core/event.service';

/**
 * Displays regional information related to the event epicenter and displays
 * a static map. The static map displays the event epicenter and historic
 * seismicity overlays while linking to the interactive map with the same
 * overlays enabled.
 */
@Component({
  selector: 'app-region-info',
  styleUrls: ['./region-info.component.scss'],
  templateUrl: './region-info.component.html'
})
export class RegionInfoComponent {
  constructor(
    public eventService: EventService
  ) {}
}
