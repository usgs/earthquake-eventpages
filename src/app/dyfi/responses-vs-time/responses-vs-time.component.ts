import { Component, OnInit } from '@angular/core';

import { Subscription } from 'rxjs';

import { DyfiService } from '../dyfi.service';
import { EventService } from '../../core/event.service';


@Component({
  selector: 'dyfi-responses-vs-time',
  templateUrl: './responses-vs-time.component.html',
  styleUrls: ['./responses-vs-time.component.scss']
})
export class ResponsesVsTimeComponent implements OnInit {

  public autoScale = true;
  public colorScheme = {
    domain: ['#34e16d']
  };
  public dyfiSeries: any;
  public gradient = false;
  public product: any = null;
  public showLegend = false;
  public showXAxis = true;
  public showXAxisLabel = true;
  public showYAxis = true;
  public showYAxisLabel = true;
  public subs = new Subscription();
  public timeline = true;
  public xAxisLabel = 'Time since earthquake (hours)';
  public yAxisLabel = 'Number of Responses';


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
