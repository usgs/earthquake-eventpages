import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'shared-station-flag',
  templateUrl: './station-flag.component.html',
  styleUrls: ['./station-flag.component.scss']
})
export class StationFlagComponent implements OnInit {

  public readonly FLAG_DESCRIPTIONS = {
    'M': 'Manually flagged',
    'T': 'Outlier',
    'G': 'Glitch (clipped or below noise)',
    'I': 'Incomplete time series',
    'N': 'Not in list of known stations'
  };

  constructor () { }
  @Input() flag: string;

  ngOnInit () {
  }

}
