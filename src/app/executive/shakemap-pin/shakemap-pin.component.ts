import { Component, Input, OnChanges } from '@angular/core';

import { EventService } from '../../event.service';

import { Event } from '../../event';

@Component({
  selector: 'shakemap-pin',
  templateUrl: './shakemap-pin.component.html',
  styleUrls: ['./shakemap-pin.component.css']
})
export class ShakemapPinComponent implements OnChanges {
  @Input() event: Event;

  public title = "ShakeMap";
  public product: any;
  public configs = {
      "defaultLayers": ["epicenter", "mmi_cont", "mi_cont"],
      "display": "static"
  };
  constructor() { }

  ngOnChanges() {
    this.product = this.event.data;
  }

}
