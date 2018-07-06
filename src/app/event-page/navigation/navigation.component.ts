import { Component, Input, OnInit } from '@angular/core';

import { Event } from '../../event';

@Component({
  selector: 'event-page-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  @Input() event: Event = null;

  constructor () { }

  ngOnInit () {
  }

  getKmlLink (event: Event) {
    return `/earthquakes/feed/v1.0/detail/${event.id}.kml`;
  }

  hasImpact (event: Event) {
    return event.hasProducts([
      'dyfi',
      'impact-text',
      'impact-link',
      'losspager',
      'ground-failure',
      'shakemap'
    ]);
  }

  hasScientific (event: Event) {
    return event.hasProducts([
      'origin',
      'phase-data',
      'moment-tensor',
      'focal-mechanism',
      'finite-fault',
      'oaf'
    ]);
  }
}
