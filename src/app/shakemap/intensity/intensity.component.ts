import { Component } from '@angular/core';

import { EventService } from '@core/event.service';

/**
 * Intensity map showed when user selects the intensity tab from main shakemap
 */
@Component({
  selector: 'shakemap-intensity',
  styleUrls: [
    './intensity.component.scss',
    '../shakemap/shakemap.component.scss'
  ],
  templateUrl: './intensity.component.html'
})
export class IntensityComponent {
  imageOverlays = ['shakemap-intensity','shakemap-stations'];
  overlays = this.imageOverlays;
  rasterOverlays = ['shakemap-mmi-contours','shakemap-stations'];

  constructor(public eventService: EventService) {}

  scrollToDownloads() {
    document.getElementById('downloads')
      .scrollIntoView({behavior: 'smooth', block: 'center', inline: 'nearest'});
  }
}
