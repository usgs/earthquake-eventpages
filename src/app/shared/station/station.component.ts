import { Component, OnInit, Input } from '@angular/core';


/**
 * Expandable/Collapsible station item, with station channel list
 *
 * @param station
 *    The station to display
 */
@Component({
  selector: 'shared-station',
  templateUrl: './station.component.html',
  styleUrls: ['./station.component.scss']
})
export class StationComponent implements OnInit {

  public readonly channelsColumns = [
    'name', 'pga', 'pgv', 'psa03', 'psa10', 'psa30'
  ];

  @Input() station: any;


  ngOnInit () {
    if (this.station === null) {
      return;
    }

    // Will need to parse from a string if used as a custom element
    if (typeof this.station === 'string') {
      this.station = JSON.parse(this.station);
    }
  }

}
