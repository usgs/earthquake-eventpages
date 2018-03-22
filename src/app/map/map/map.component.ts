import { Component, OnInit } from '@angular/core';

import { MapComponent as SharedMapComponent } from '../../shared/map/map.component';


@Component({
  selector: 'map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  constructor () { }

  ngOnInit () {
  }

}
