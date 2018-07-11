import {Component, Input, OnInit} from '@angular/core';

import { Event } from '../../event';

@Component({
  selector: 'executive-nearby-seismicity-pin',
  templateUrl: './nearby-seismicity-pin.component.html',
  styleUrls: ['./nearby-seismicity-pin.component.scss']
})
export class NearbySeismicityPinComponent implements OnInit {
  @Input() event: Event;
  @Input() link: string;
  public title = 'View Nearby Seismicity';
  public footer = 'ANSS Comcat';
  public minimumMag;

  constructor() { }

  ngOnInit() {
    this.minimumMag = this.getMinimumMag(this.event.properties.mag || 3);
  }

  getMinimumMag(magnitude) {
    return Math.max(Math.floor(magnitude) - 3, 1);
  }
}
