import { Component, OnDestroy, OnInit } from '@angular/core';

import { Subscription } from 'rxjs';

import { DyfiService } from '../dyfi.service';
import { EventService } from '@core/event.service';

@Component({
  selector: 'dyfi-intensity-vs-distance',
  styleUrls: ['./intensity-vs-distance.component.scss'],
  templateUrl: './intensity-vs-distance.component.html'
})
export class IntensityVsDistanceComponent implements OnInit, OnDestroy {
  allResults: any[] = null;
  animations = true;
  autoScale = true;
  bubbleSeries: any[] = null;
  classOptions = {
    binned: {
      color: '#8d91ff',
      styles: {
        borderColor: '#000000',
        r: 5
      },
      type: 'scatter'
    },
    default: {
      type: 'scatter'
    },
    estimated1: {
      color: '#d65617',
      type: 'line'
    },
    estimated2: {
      color: '#5fce3b',
      type: 'line'
    },
    median: {
      color: '#fe4d55',
      styles: {
        borderColor: '#000000',
        r: 2
      },
      type: 'scatter'
    },
    scatterplot1: {
      color: '#94dfea',
      type: 'scatter'
    }
  };
  colorScheme = {
    domain: [
      '#5AA454',
      '#A10A28',
      '#C7B42C',
      '#AAAAAA',
      '#8d91ff',
      '#94dfea',
      '#fe4d55',
      '#5fce3b'
    ]
  };
  customColors: any[] = [];
  gradient = false;
  lineSeries: any[] = null;
  product: any = null;
  scaleType = 'log';
  showLegend = true;
  showXAxis = true;
  showXAxisLabel = true;
  showYAxis = true;
  showYAxisLabel = true;
  subs = new Subscription();
  xAxisLabel = 'Hypocentral Distance (km)';
  yAxisLabel = 'Intensity (mmi)';

  constructor(
    public dyfiService: DyfiService,
    public eventService: EventService
  ) {}

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  ngOnInit() {
    this.subs.add(
      this.dyfiService.plotAtten$.subscribe(series => {
        this.onDyfiSeries(series);
      })
    );
    this.subs.add(
      this.eventService.product$.subscribe(product => {
        this.onProduct(product);
      })
    );
  }

  /**
   * Get DYFI data ready for plotting
   *
   * @param dyfiData
   *     processed data from DyfiService
   */
  onDyfiSeries(dyfiData) {
    if (!dyfiData) {
      this.bubbleSeries = null;
      this.lineSeries = null;

      return;
    }

    const bubbleSeries = [];
    const lineSeries = [];
    const dyfiSeries = dyfiData.series;
    for (const series of dyfiSeries) {
      const options =
        this.classOptions[series.class] || this.classOptions.default;

      // add styles to specific features
      if (options.styles) {
        series.series = series.series.map(data => {
          return { ...data, ...options.styles };
        });
      }

      if (options.type === 'line') {
        lineSeries.push(series);
      } else {
        bubbleSeries.push(series);
      }

      if (options.color) {
        this.customColors.push({
          name: series.name,
          value: options.color
        });
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
  onProduct(product) {
    this.product = product;
    this.dyfiService.getAtten(product);
  }
}
