import { Component, OnInit } from '@angular/core';
import { StationService } from './station.service';
import { Subscription } from 'rxjs/Subscription';

import { getRomanFromMmi } from '../../util/mmi_roman';
import { getMmiRgba } from '../../util/mmi_colors';


@Component({
  selector: 'shakemap-view-station-list',
  templateUrl: './station-list.component.html',
  styleUrls: ['./station-list.component.scss']
})
export class StationListComponent implements OnInit {
  private subs: any[] = [];
  public stations: any = [];
  public getColor: any = getMmiRgba;
  public getRoman: any = getRomanFromMmi;
  public isNaN: any = isNaN;

  constructor(public stationService: StationService) { }

  ngOnInit() {
    this.subs.push(this.stationService.data.subscribe((data: any) => {
      this.stations = data;
    }));
  }

  toggleDetails(station) {
    if (station['showDetails']) {
      station['showDetails'] = false;
    } else {
      station['showDetails'] = true;
    }
  }

  getAmp(name:string, amps: any[]) {
    for (let amp of amps) {
      if (amp['name'] === name) {
        return amp
      }
    }
    return {};
  }

}
