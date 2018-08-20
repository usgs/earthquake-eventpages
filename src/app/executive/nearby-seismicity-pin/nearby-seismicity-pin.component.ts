import { Component, Input, OnInit } from '@angular/core';

import { Event } from '../../event';

/**
 * Nearby Seismicity Pin
 *
 * @param event
 *     event object
 *
 * @param link
 *     link for pin
 */
@Component({
  selector: 'executive-nearby-seismicity-pin',
  styleUrls: ['./nearby-seismicity-pin.component.scss'],
  templateUrl: './nearby-seismicity-pin.component.html'
})
export class NearbySeismicityPinComponent implements OnInit {
  @Input()
  event: Event;
  footer = 'ANSS Comcat';
  @Input()
  link: string;
  minimumMag;
  title = 'View Nearby Seismicity';

  /**
   * Logic to determine the minimum magnitude for the nearby seismicity search
   *
   * @param magnitude
   *     event magnitude
   *
   * @return {number}
   *     minimum magnitude for search
   */
  getMinimumMag(magnitude: number) {
    return Math.max(Math.floor(magnitude) - 3, 1);
  }

  ngOnInit() {
    this.minimumMag = this.getMinimumMag(this.event.properties.mag || 3);
  }
}
