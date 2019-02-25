import { Component, OnInit, OnDestroy } from '@angular/core';

import { EventService } from '@core/event.service';
import { StationService } from '@core/station.service';

@Component({
  selector: 'shakemap-regression-plot',
  styleUrls: ['./regression-plot.component.scss'],
  templateUrl: './regression-plot.component.html'
})
export class RegressionPlotComponent implements OnInit {
  bubbleSeries: any[] = [
    {
      class: 'bubble1',
      name: 'Test Bubbles',
      series: [
        {name: 1, value: 1, x: 1, y: 1, r: 2},
        {name: 15, value: 2, x: 15, y: 2, r: 3},
        {name: 22, value: 6, x: 22, y: 6, r: 4}
      ]
    }
  ];

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
  lineSeries: any[] = null;
  product: any = null;
  scaleType = 'log';
  xAxisLabel = 'Distance to Rupture Surface (km)';
  yAxisLabel = 'Peak Ground Acceleration (%g)';


  constructor (
    public eventService: EventService,
    public stationService: StationService
  ) {}

  ngOnInit() {

  }

}
