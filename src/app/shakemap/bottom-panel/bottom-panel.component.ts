import { Component, OnInit } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

import { InfoService } from './info/info.service';
import { StationService } from './station-list/station.service';

@Component({
  selector: 'shakemap-view-bottom-panel',
  templateUrl: './bottom-panel.component.html',
  styleUrls: ['./bottom-panel.component.scss'],
  animations: [
  trigger('panelState', [
    state('inactive', style({
      transform: 'translateY(100%)'
    })),
    state('active',   style({
      transform: 'translateY(0)'
    })),
    transition('inactive => active', animate('300ms ease-in')),
    transition('active => inactive', animate('300ms ease-out'))
  ])
]
})
export class BottomPanelComponent implements OnInit {
  public panelState: string = 'inactive';
  public selected: string = null;

  constructor(public infoService: InfoService,
              public stationService: StationService) { }

  ngOnInit() {
    this.panelState = 'active';
  }

  select(tab:string) {
    if (tab === this.selected) {
      this.selected = null;
    } else {
      this.selected = tab;
    }
  }

  toggleState() {
    if (this.panelState === 'active') {
      this.panelState = 'inactive';
    } else {
      this.panelState = 'active';
    }
  }

}
