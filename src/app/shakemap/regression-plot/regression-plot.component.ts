import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { EventService } from '@core/event.service';
import { StationService } from '@core/station.service';

@Component({
  selector: 'shakemap-regression-plot',
  styleUrls: ['./regression-plot.component.scss'],
  templateUrl: './regression-plot.component.html'
})
export class RegressionPlotComponent implements OnInit {
  classOptions = {
    smStations: {
      color: '#94dfea',
      type: 'scatter'
    }
  };
  colorScheme = {
    domain: [
      '#94dfea',
      '#fe4d55',
      '#5fce3b',
      '#5AA454',
      '#A10A28',
      '#C7B42C',
      '#AAAAAA',
      '#8d91ff'
    ]
  };
  customColors = [
    {name: 'Seismic Stations', value:'#94dfea'},
    {name: 'DYFI Stations', value:'#94dfea'}
  ];
  lineSeries: any[] = null;
  plotX = 'distance';
  plotY = 'pga';
  plotYOptions = [
    {key: 'pga', display: 'PGA', plot: 'Peak Ground Acceleration %g'},
    {key: 'pgv', display: 'PGV', plot: 'Peak Ground Velocity m/s'},
    {key: 'intensity', display: 'MMI', plot: 'Intensity (MMI)'}
  ];
  product: any = null;
  scaleType = 'log';
  subs = new Subscription();
  xAxisLabel = 'Distance to Rupture Surface (km)';
  yAxisLabel = 'Peak Ground Acceleration (%g)';

  constructor (
    public eventService: EventService,
    public stationService: StationService
  ) {}

  ngOnInit () {
    this.subs.add(
      this.eventService.product$.subscribe(shakemap => {
        this.onShakemap(shakemap);
      })
    );
  }

  onShakemap (shakemap) {
    this.stationService.getStations(shakemap);
  }

  setYAxis(option) {
    this.plotY = option.key;
    this.yAxisLabel = option.plot;
  }

}
