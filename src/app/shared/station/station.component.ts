import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'shared-station',
  templateUrl: './station.component.html',
  styleUrls: ['./station.component.css']
})
export class StationComponent implements OnInit {
  @Input() station: any;

  public isNaN: any = isNaN;

  constructor() {}

   ngOnInit() {}

  toggleDetails(station) {
    if (station['showDetails']) {
      station['showDetails'] = false;
    } else {
      station['showDetails'] = true;
    }
  }

  getAmp(name: string, amps: any[]) {
    for (const amp of amps) {
      if (amp['name'] === name) {
        return amp;
      }
    }
    return {};
  }

}
