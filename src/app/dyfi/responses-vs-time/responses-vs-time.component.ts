import { Component, OnInit } from '@angular/core';

import { Subscription } from 'rxjs';

import { EventService } from '@core/event.service';
import { DyfiService } from '../dyfi.service';

/**
 * Generate RESPONSES VS. TIME tab for dyfi product page
 */
@Component({
  selector: 'dyfi-responses-vs-time',
  styleUrls: ['./responses-vs-time.component.scss'],
  templateUrl: './responses-vs-time.component.html'
})
export class ResponsesVsTimeComponent implements OnInit {
  autoScale = true;
  colorScheme = {
    domain: ['#34e16d']
  };
  dyfiSeries: any;
  gradient = false;
  product: any = null;
  scaleType = 'linear';
  showLegend = false;
  showXAxis = true;
  showXAxisLabel = true;
  showYAxis = true;
  showYAxisLabel = true;
  subs = new Subscription();
  xAxisLabel = null;
  xAxisTicks = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13,
      14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24];
  xScaleMax = null;
  yAxisLabel = 'Number of Responses';


  constructor(
    public dyfiService: DyfiService,
    public eventService: EventService
  ) {}

  ngOnInit() {
    this.subs.add(
      this.dyfiService.plotNumResp$.subscribe(series => {
        this.onDyfiSeries(series);
      })
    );
    this.subs.add(
      this.eventService.product$.subscribe(product => {
        this.onProduct(product);
      })
    );
  }

  onDyfiSeries(dyfiData) {
    if (dyfiData === null || !dyfiData) {
      this.dyfiSeries = null;

      return;
    }

    const prefUnit = dyfiData.preferred_unit;

    this.xAxisLabel = `Time since earthquake (${prefUnit})`;

    // limit xScale to one day if the units are hours
    if (prefUnit === 'hours') {
      this.xScaleMax = 24;
    } else {
      this.xAxisTicks = null;
    }

    this.dyfiSeries = dyfiData;
  }

  /**
   * Retrieve required DYFI-generated product
   *
   * @param product DYFI product
   */
  onProduct(product) {
    this.product = product;
    this.dyfiService.getNumResp(product);
  }

  /**
   * Returns the tick format value of the chart
   * @param value
   *    The value of the x axis tick
   */
  xAxisTickFormatting (value) {
    return value;
  }
}
