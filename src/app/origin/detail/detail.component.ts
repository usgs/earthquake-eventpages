import { Component } from '@angular/core';

import { Event } from '../../event';

import { AttributionComponent } from '../../shared/attribution/attribution.component';
import { CoordinatesComponent } from '../../shared/coordinates/coordinates.component';
import { FeRegionComponent } from '../../shared/fe-region/fe-region.component';
import { UncertainValueComponent } from '../../shared/uncertain-value/uncertain-value.component';

import { EventService } from '../../core/event.service';
import { FormatterService } from '../../core/formatter.service';

@Component({
  selector: 'origin-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent {

  constructor(
    public eventService: EventService,
    public formatter: FormatterService
  ) { }

  getCatalogDetail (eventSource: string, eventSourceCode: string): string {
    if (!eventSource) {
      return '&ndash;';
    }

    const eventId = (eventSource + eventSourceCode).toLowerCase();
    return eventSource.toUpperCase() + ' <small>(' + eventId + ')</small>';
  }

  getProduct (): any {
    let product = this.eventService.product$.getValue() || {};

    if (product && product.phasedata) {
      product = product.phasedata;
    }

    return product;
  }

  hasEventTime (props: any): boolean {
    return (typeof props.eventtime === 'string');
  }
}
