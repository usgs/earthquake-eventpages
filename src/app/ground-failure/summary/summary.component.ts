import { Component, OnInit } from '@angular/core';
import { EventService } from '../../../..';

@Component({
  selector: 'ground-failure-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit {

  constructor(
    public eventService: EventService
  ) { }

  ngOnInit() {
  }

  getMapBounds (product: any) {
    if (product && product.properties &&
        product.properties['minimum-latitude'] &&
        product.properties['minimum-longitude'] &&
        product.properties['maximum-latitude'] &&
        product.properties['maximum-longitude']
    ) {
      return [
        [
          product.properties['minimum-latitude'],
          product.properties['minimum-longitude']
        ],
        [
          product.properties['maximum-latitude'],
          product.properties['maximum-longitude']
        ]
      ];
    }

    return null;
  }
}
