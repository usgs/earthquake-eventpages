import { Component, OnInit } from '@angular/core';

import { Subscription } from 'rxjs';

import { EventService } from '@core/event.service';
import { DyfiService } from '../dyfi.service';


/**
 * Generate RESPONSES VS. TIME tab for dyfi product page
 */
@Component({
  selector: 'dyfi-responses-vs-time',
  templateUrl: './responses-vs-time.component.html',
  styleUrls: ['./responses-vs-time.component.scss']
})
export class ResponsesVsTimeComponent implements OnInit {

  autoScale = true;
  colorScheme = {
    domain: ['#34e16d']
  };
  dyfiSeries: any;
  gradient = false;
  product: any = null;
  showLegend = false;
  showXAxis = true;
  showXAxisLabel = true;
  showYAxis = true;
  showYAxisLabel = true;
  subs = new Subscription();
  timeline = true;
  xAxisLabel = 'Time since earthquake (hours)';
  yAxisLabel = 'Number of Responses';


  constructor (
    public dyfiService: DyfiService,
    public eventService: EventService
  ) {}


  ngOnInit () {
    this.subs.add(this.dyfiService.plotNumResp$.subscribe((series) => {
      this.onDyfiSeries(series);
    }));
    this.subs.add(this.eventService.product$.subscribe((product) => {
      this.onProduct(product);
    }));
  }


  onDyfiSeries (dyfiData) {
    if (dyfiData === null || !dyfiData) {
      this.dyfiSeries = null;

      return;
    }

    this.dyfiSeries = dyfiData;
  }

  /**
   * Retrieve required DYFI-generated product
   *
   * @param product DYFI product
   */
  onProduct (product) {
    this.product = product;
    this.dyfiService.getNumResp(product);
  }
}
