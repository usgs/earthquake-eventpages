import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'shared-station',
  templateUrl: './station.component.html',
  styleUrls: ['./station.component.css']
})
export class StationComponent implements OnInit {
  @Input() station: any;
  public readonly channelsColumns = ['name', 'pga', 'pgv', 'psa03', 'psa10', 'psa30'];

  constructor () {}

   ngOnInit () {
     if (this.station === null) {
       return;
     }

     if (typeof this.station === 'string') {
       this.station = JSON.parse(this.station);
     }
   }

}
