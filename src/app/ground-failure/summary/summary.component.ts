import { Component } from '@angular/core';

import { EventService } from '../../core/event.service';


/**
 * Display summary tab on ground-failure product page
 */
@Component({
  selector: 'ground-failure-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent {

  constructor(
    public eventService: EventService
  ) { }


  /**
   * Get map bounds from the ground-failure product
   *
   * @param product
   *     ground-failure type product
   *
   * @return
   *     map bounds
   */
  getMapBounds (product: any): Array<any> {
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
