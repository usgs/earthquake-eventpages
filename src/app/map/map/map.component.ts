import { Component } from '@angular/core';

import { MapComponent as SharedMapComponent } from '../../shared/map/map.component';

import { EventService } from '../../../..';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent {

  constructor (
    public activatedRoute: ActivatedRoute,
    public eventService: EventService
  ) { }

}
