import { Component } from '@angular/core';

import { EventService } from '../../core/event.service';
import { FormatterService } from '../../core/formatter.service';


/**
 * Detail tab contents for the Origin Module
 */
@Component({
  selector: 'origin-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent {

  constructor(
    public eventService: EventService,
    public formatter: FormatterService
  ) { }

  /**
   * Get phase data when it exists
   *
   */
  getProduct (): any {
    let product = this.eventService.product$.getValue() || {};

    if (product && product.phasedata) {
      product = product.phasedata;
    }

    return product;
  }
}
