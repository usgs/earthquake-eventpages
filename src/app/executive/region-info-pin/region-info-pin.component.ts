import { Component, OnInit, Input } from '@angular/core';

import { Event } from '../../event';


@Component({
  selector: 'executive-region-info-pin',
  templateUrl: './region-info-pin.component.html',
  styleUrls: ['./region-info-pin.component.css']
})
export class RegionInfoPinComponent implements OnInit {

  @Input() event: Event;

  public link = '../region-info';
  public title = 'Regional Information';

  constructor () { }

  ngOnInit() {
  }

}
