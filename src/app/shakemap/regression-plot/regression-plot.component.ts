import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { EventService } from '@core/event.service';
import { StationService } from '@core/station.service';
import { routerNgProbeToken } from '@angular/router/src/router_module';

@Component({
  selector: 'shakemap-regression-plot',
  styleUrls: ['./regression-plot.component.scss'],
  templateUrl: './regression-plot.component.html'
})
export class RegressionPlotComponent implements OnInit, OnDestroy {
  axisScaleOptions = [
    {display: 'Log', scaleType: 'log'},
    {display: 'Linear', scaleType: 'linear'}
  ];
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
  plotting: any = {x: {}, y: {}};
  plotXOptions = [
    {type: 'rrup', display: 'RRup', label: 'Rupture Distance (km)'},
    {type: 'rjb', display: 'RJB', label: 'Joyner-Boore Distance (km)'},
    {type: 'rhypo', display: 'RHYPO', label: 'Hypocentral Distance (km)'}
  ];
  plotYOptions = [
    {type: 'pga', display: 'PGA', label: 'Peak Ground Acceleration %g'},
    {type: 'pgv', display: 'PGV', label: 'Peak Ground Velocity cm/s'},
    {type: 'intensity', display: 'MMI', label: 'Intensity (MMI)'}
  ];
  product: any = null;
  residual = false;
  subs = new Subscription();
  xScaleType = 'log';
  yScaleType = 'log';

  constructor (
    public eventService: EventService,
    public stationService: StationService
  ) {
    this.plotting.x = this.plotXOptions[0];
    this.plotting.y = this.plotYOptions[0];
  }

  ngOnDestroy () {
    this.subs.unsubscribe();
  }

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
}
