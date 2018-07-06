import { Component, Input } from '@angular/core';

import { Event } from '../../event';

@Component({
  selector: 'executive-nearby-seismicity-pin',
  templateUrl: './nearby-seismicity-pin.component.html',
  styleUrls: ['./nearby-seismicity-pin.component.scss']
})
export class NearbySeismicityPinComponent {
  @Input() event: Event;
  @Input() link: string;
  public title = 'View Nearby Seismicity';
  public footer = 'ANSS Comcat';

  constructor() { }

}
