import { Component, Input } from '@angular/core';

@Component({
  selector: 'shared-station',
  templateUrl: './station.component.html',
  styleUrls: ['./station.component.css']
})
export class StationComponent {
  @Input() station: any;
  constructor() { }
  
  getAmp(name:string, amps: any[]) {
    for (let amp of amps) {
      if (amp['name'] === name) {
        return amp
      }
    }
    return {};
  }

}
