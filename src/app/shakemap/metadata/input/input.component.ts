import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'shakemap-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit {
  public names: any = {
    'location': 'Location',
    'longitude': 'Longitude',
    'seismic_stations': 'Number of Seismic Stations',
    'magnitude': 'Magnitude',
    'depth': 'Depth',
    'event_id': 'ID',
    'event_description': 'Description', 'origin_time': 'Origin Time',
    'latitude': 'Latitude',
    'fault_ref': 'Fault References',
    'src_mech': 'Mechanism Source',
    'intensity_observations': 'Number of DYFI Stations'
  };

  public rowOrder: string[] = ['event_description', 'event_id', 'magnitude',
                            'depth', 'longitude', 'latitude', 'origin_time',
                            'src_mech', 'location', 'fault_ref', 'seismic_stations',
                            'intensity_observations'];

  constructor() { }
  @Input() smInput: any;

  ngOnInit() {
  }

}
