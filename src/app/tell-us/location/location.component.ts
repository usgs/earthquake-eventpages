import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Component({
  selector: 'tell-us-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']
})
export class LocationComponent implements OnInit {

  @Output()
  change = new BehaviorSubject<any>(null);

  name = 'location';

  constructor() { }

  ngOnInit() {
  }

  clearLocation () {
    this.change.next({
      ciim_mapAddress: null,
      ciim_mapConfidence: null,
      ciim_mapLat: null,
      ciim_mapLon: null
    });
  }

  enterLocation () {
    this.change.next({
      ciim_mapAddress: '1711 Illinois Street, Golden, CO',
      ciim_mapConfidence: 5,
      ciim_mapLat: 39.74951,
      ciim_mapLon: -105.22134
    });
  }

}
