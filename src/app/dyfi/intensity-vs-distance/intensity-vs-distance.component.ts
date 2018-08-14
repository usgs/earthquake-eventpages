import { Component, OnDestroy, OnInit } from '@angular/core';

import { Subscription } from 'rxjs';

import { DyfiService } from '../dyfi.service';
import { EventService } from '@core/event.service';


@Component({
  selector: 'dyfi-intensity-vs-distance',
  templateUrl: './intensity-vs-distance.component.html',
  styleUrls: ['./intensity-vs-distance.component.scss']
})
export class IntensityVsDistanceComponent implements OnInit, OnDestroy {

  public allResults: any[] = null;
  public autoScale = true;
  public animations = true;
  public bubbleSeries: any[] = null;
  public classOptions = {
    'scatterplot1': {
      type: 'scatter',
      color: '#94dfea',
    },
    'estimated1': {
      type: 'line',
      color: '#d65617'
    },
    'estimated2': {
      type: 'line',
      color: '#5fce3b'
    },
    'binned': {
      type: 'scatter',
      color: '#8d91ff',
      styles: {
        r: 5,
        borderColor: '#000000',
      }
    },
    'median': {
      type: 'scatter',
      color: '#fe4d55',
      styles: {
        r: 2,
        borderColor: '#000000',
      }
    },
    'default': {
      type: 'scatter'
    }
  };
  public colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA', '#8d91ff', '#94dfea', '#fe4d55', '#5fce3b']
  };
  public customColors: any[] = [];
  public gradient = false;
  public lineSeries: any[] = null;
  public product: any = null;
  public scaleType = 'log';
  public showLegend = true;
  public showXAxis = true;
  public showXAxisLabel = true;
  public showYAxis = true;
  public showYAxisLabel = true;
  public subs = new Subscription();
  public xAxisLabel = 'Hypocentral Distance (km)';
  public yAxisLabel = 'Intensity (mmi)';


  constructor (
    public dyfiService: DyfiService,
    public eventService: EventService
  ) {}


  ngOnInit () {
    this.subs.add(this.dyfiService.plotAtten$.subscribe((series) => {
      this.onDyfiSeries(series);
    }));
    this.subs.add(this.eventService.product$.subscribe((product) => {
      this.onProduct(product);
    }));
  }

  ngOnDestroy () {
    this.subs.unsubscribe();
  }


  /**
   * Get DYFI data ready for plotting
   *
   * @param dyfiData
   *     processed data from DyfiService
   */
  onDyfiSeries (dyfiData) {
    if (!dyfiData) {
      this.bubbleSeries = null;
      this.lineSeries = null;

      return;
    }

    const bubbleSeries = [];
    const lineSeries = [];
    const dyfiSeries = dyfiData.series;
    for (const series of dyfiSeries) {
      const options = this.classOptions[series.class] || this.classOptions.default;

      // add styles to specific features
      if (options.styles) {
        series.series = series.series.map((data) => {
          return {...data, ...options.styles};
        });
      }

      if (options.type === 'line') {
        lineSeries.push(series);
      } else {
        bubbleSeries.push(series);
      }

      if (options.color) {
        this.customColors.push(
          {
            name: series.name,
            value: options.color
          }
        );
      }
    }

    this.bubbleSeries = bubbleSeries;
    this.lineSeries = lineSeries;
    this.allResults = [...bubbleSeries, ...lineSeries];
  }

  /**
   * New product, get new station list
   *
   * @param product
   *     shakemap product
   */
  onProduct (product) {
    this.product = product;
    this.dyfiService.getAtten(product);
  }
}
