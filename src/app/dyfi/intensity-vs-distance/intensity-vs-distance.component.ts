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
  public dyfiSeries: any = null;
  public bubbleSeries: any = null;
  public lineSeries: any = null;
  public allResults: any = null;

  public classTypes = {
    'scatterplot1': 'scatter',
    'estimated1': 'line',
    'estimated2': 'line',
    'binned': 'scatter',
    'median': 'scatter'
  }

  public styles = {
    'scatterplot1': {
      r: 1,
      border: null,
    },
    'binned': {
      r: 5,
      border: null,
    },
    'median': {
      r: 1,
      border: 1,
    }
  }
  
  // plot options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  animations = true;
  showXAxisLabel = true;
  xAxisLabel = 'Hypocentral Distance (km)';
  showYAxisLabel = true;
  yAxisLabel = 'Intensity (mmi)';

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

  onDyfiSeries(dyfiData) {
    if (dyfiData == null) {
      this.dyfiSeries = null;

      return;
    }

    let bubbleSeries = [];
    let lineSeries = [];
    for (let series of dyfiData.series) {
      let styles = this.styles[series.class] ? this.styles[series.class] : null;

      // add styles to specific features
      if (styles !== null) {
        series.series = series.series.map((data) => {
          return {...data, ...styles};
        });
      }

      if (this.classTypes[series.class] == 'scatter') {
        bubbleSeries.push(series);
      } else if (this.classTypes[series.class] == 'line') {
        lineSeries.push(series);
      }
    }

    this.bubbleSeries = bubbleSeries;
    this.lineSeries = lineSeries;
    this.allResults = [...bubbleSeries, ...lineSeries];
  }
  
  onSelect(event) {
    console.log(event);
  }
}
