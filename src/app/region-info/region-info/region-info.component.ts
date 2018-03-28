import { Component, OnInit } from '@angular/core';

import { HistoricSeismicityOverlay } from '../../shared/map-overlay/historic-seismicity-overlay';
import { Overlay } from '../../shared/map-overlay/overlay';

@Component({
  selector: 'app-region-info',
  templateUrl: './region-info.component.html',
  styleUrls: ['./region-info.component.css']
})
export class RegionInfoComponent implements OnInit {

  public overlays: Array<Overlay> = [ new HistoricSeismicityOverlay() ];

  constructor () { }

  ngOnInit () {
  }

}
