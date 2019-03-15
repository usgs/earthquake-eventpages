import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { EventService } from '@core/event.service';
import { StationService } from '@core/station.service';

@Component({
  selector: 'shakemap-analysis',
  styleUrls: ['./analysis.component.scss'],
  templateUrl: './analysis.component.html'
})
export class AnalysisComponent implements OnInit, OnDestroy {
  axisScaleOptions = [
    {display: 'Log', scaleType: 'log'},
    {display: 'Linear', scaleType: 'linear'}
  ];
  customColors = [
    {name: 'Seismic Stations', value:'#94dfea'},
    {name: 'DYFI Stations', value:'#94dfea'},
    {name: 'Seismic Station Predictions', value:'#5fce3b'},
    {name: 'DYFI Station Predictions', value:'#5fce3b'}
  ];
  groundType = 'soil';
  groundTypes = [
    {display: 'Soil', value: 'soil'},
    {display: 'Rock', value: 'rock'}
  ]
  lineSeries: any[] = null;
  plotting: any = {x: {}, y: {}};
  plotXOptions = [
    {type: 'rrup', display: 'Rrup', label: 'Rupture Distance (km)'},
    {type: 'rjb', display: 'Rjb', label: 'Joyner-Boore Distance (km)'},
    {type: 'rhypo', display: 'Rhypo', label: 'Hypocentral Distance (km)'}
  ];
  plotYOptions = [
    {type: 'pga', display: 'PGA', label: 'Peak Ground Acceleration %g'},
    {type: 'pgv', display: 'PGV', label: 'Peak Ground Velocity cm/s'},
    {type: 'intensity', display: 'MMI', label: 'Intensity (MMI)'}
  ];
  product: any = null;
  ratio = false;
  residual = false;
  shakemap = null;
  subs = new Subscription();
  xScaleType = 'log';
  yScaleType = 'log';

  constructor (
    public eventService: EventService,
    public stationService: StationService
  ) {
    // set default plotting options
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
    this.shakemap = shakemap;
    this.stationService.getStations(shakemap);
  }

  /**
   * Change yScaleType depending on the selected IMT
   * @param option
   *    IMT option with {type: ['pga', 'pgv', 'intensity'], ...}
   */
  setImt (option) {
    if (this.residual && this.ratio) {
      this.yScaleType = 'log';
    } else if (option.type === 'intensity' || this.residual) {
      this.yScaleType = 'linear';
    } else {
      this.yScaleType = 'log';
    }
  }

  /**
   * Change yScaleType to log/linear depending on conditions when
   * the residual switch is toggled
   */
  toggleResidual () {
    if ((this.residual && !this.ratio) ||
        (!this.residual && this.plotting.y.type === 'intensity')) {
      this.yScaleType = 'linear';
    } else {
      this.yScaleType = 'log';
    }
  }
}
