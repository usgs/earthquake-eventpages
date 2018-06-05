import { Component, OnInit } from '@angular/core';

import { Subscription } from 'rxjs';

import { DyfiService } from '../../core/dyfi.service';
import { EventService } from '../../core/event.service';

@Component({
  selector: 'dyfi-intensity-vs-distance',
  templateUrl: './intensity-vs-distance.component.html',
  styleUrls: ['./intensity-vs-distance.component.scss']
})
export class IntensityVsDistanceComponent implements OnInit {
  private subs = new Subscription();
  public dyfiSeries = null;
  
  // plot options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Country';
  showYAxisLabel = true;
  yAxisLabel = 'Population';

   colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

   // line, area
  autoScale = true

  constructor (
    public dyfiService: DyfiService,
    public eventService: EventService
  ) {}

  ngOnInit() {
    this.subs.add(this.dyfiService.plotAtten$.subscribe((series) => {
      this.onDyfiSeries(series);
    }));
    this.subs.add(this.eventService.product$.subscribe((product) => {
      this.onProduct(product);
    }));
  }

  /**
   * New product, get new station list
   *
   * @param product shakemap product
   */
  onProduct(product) {
    this.dyfiService.getAtten(product);
  }

  onDyfiSeries(series) {
    if (series == null) {
      this.dyfiSeries = null;
    }

    this.dyfiSeries = series;
  }
  
  onSelect(event) {
    console.log(event);
  }

}
