import {Component, Input, OnInit} from '@angular/core';

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
  templateUrl: './nearby-seismicity-pin.component.html',
  styleUrls: ['./nearby-seismicity-pin.component.scss']
})
export class NearbySeismicityPinComponent implements OnInit {

  public title = 'View Nearby Seismicity';
  public footer = 'ANSS Comcat';
  public minimumMag;

  @Input() event: Event;
  @Input() link: string;


  ngOnInit() {
    this.minimumMag = this.getMinimumMag(this.event.properties.mag || 3);
  }

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
}
