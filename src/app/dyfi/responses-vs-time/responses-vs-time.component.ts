import { Component, OnInit } from '@angular/core';

import { Subscription } from 'rxjs';

import { DyfiService } from '../../core/dyfi.service';
import { EventService } from '../../core/event.service';

@Component({
  selector: 'dyfi-responses-vs-time',
  templateUrl: './responses-vs-time.component.html',
  styleUrls: ['./responses-vs-time.component.scss']
})
export class ResponsesVsTimeComponent implements OnInit {
  private subs = new Subscription();
  public dyfiSeries: any;

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = false;
  showXAxisLabel = true;
  xAxisLabel = 'Time since earthquake (hours)';
  showYAxisLabel = true;
  yAxisLabel = 'Number of Responses';
  timeline = true;
  autoScale = true;

  colorScheme = {
    domain: ['#34e16d']
  };

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

  onProduct (product) {
    this.dyfiService.getNumResp(product);
  }
}
